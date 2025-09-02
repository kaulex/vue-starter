import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useDefaultStore = defineStore("default", () => {
  const loadFromLocalStorage = () => {
    const savedSandwiches = localStorage.getItem("sandwiches");
    const savedFavorites = localStorage.getItem("favoriteSandwiches");
    return {
      sandwiches: savedSandwiches ? JSON.parse(savedSandwiches) : [],
      favoriteSandwiches: savedFavorites ? JSON.parse(savedFavorites) : [],
    };
  };

  const { sandwiches: savedSandwiches, favoriteSandwiches: savedFavorites } =
    loadFromLocalStorage();

  const breads: string[] = [
    "Baguette",
    "Ciabatta",
    "Pain de seigle",
    "Wrap",
    "Pain aux céréales",
  ];

  const sauces: string[] = [
    "Mayonnaise",
    "Moutarde",
    "Pesto",
    "Sauce barbecue",
    "Sauce aigre-douce",
  ];

  const cheeses: string[] = [
    "Cheddar",
    "Mozzarella",
    "Gouda",
    "Emmental",
    "Roquefort",
  ];

  const fillings: string[] = ["Jambon", "Poulet", "Saumon", "Thon", "Bacon"];

  const sandwiches = ref<string[]>(savedSandwiches);
  const favoriteSandwiches = ref<string[]>(savedFavorites);

  watch(
    () => [sandwiches.value, favoriteSandwiches.value],
    ([newSandwiches, newFavorites]) => {
      localStorage.setItem("sandwiches", JSON.stringify(newSandwiches));
      localStorage.setItem("favoriteSandwiches", JSON.stringify(newFavorites));
    },
    { deep: true }
  );

  const addSandwich = (sandwich: string) => {
    sandwiches.value.push(sandwich);
  };

  const addToFavorites = (sandwich: string) => {
    if (!favoriteSandwiches.value.includes(sandwich)) {
      favoriteSandwiches.value.push(sandwich);
    }
  };

  const addIngredient = (category: string, ingredient: string) => {
    if (category in { breads, sauces, cheeses, fillings }) {
      const categoryArray = (
        {
          breads,
          sauces,
          cheeses,
          fillings,
        } as { [key: string]: string[] }
      )[category];
      categoryArray.push(ingredient);
    }
  };

  const removeIngredient = (category: string, index: number) => {
    if (category in { breads, sauces, cheeses, fillings }) {
      const categoryArray = (
        {
          breads,
          sauces,
          cheeses,
          fillings,
        } as { [key: string]: string[] }
      )[category];
      categoryArray.splice(index, 1);
    }
  };

  return {
    breads,
    sauces,
    cheeses,
    fillings,
    sandwiches,
    favoriteSandwiches,
    addSandwich,
    addToFavorites,
    addIngredient,
    removeIngredient,
  };
});
