import { defineStore } from "pinia";
import { ref, watch } from "vue";

import type { IngredientCategory } from "@/types";

export const useDefaultStore = defineStore("default", () => {
  const loadFromLocalStorage = () => {
    const savedSandwiches = localStorage.getItem("sandwiches");
    const savedFavorites = localStorage.getItem("favoriteSandwiches");
    const savedBreads = localStorage.getItem("breads");
    const savedSauces = localStorage.getItem("sauces");
    const savedCheeses = localStorage.getItem("cheeses");
    const savedFillings = localStorage.getItem("fillings");
    return {
      sandwiches: savedSandwiches ? JSON.parse(savedSandwiches) : [],
      favoriteSandwiches: savedFavorites ? JSON.parse(savedFavorites) : [],
      breads: savedBreads ? JSON.parse(savedBreads) : [],
      sauces: savedSauces ? JSON.parse(savedSauces) : [],
      cheeses: savedCheeses ? JSON.parse(savedCheeses) : [],
      fillings: savedFillings ? JSON.parse(savedFillings) : [],
    };
  };

  const {
    sandwiches: savedSandwiches,
    favoriteSandwiches: savedFavorites,
    breads: savedBreads,
    sauces: savedSauces,
    cheeses: savedCheeses,
    fillings: savedFillings,
  } = loadFromLocalStorage();

  const breads = ref<string[]>(
    savedBreads.length > 0
      ? savedBreads
      : ["Baguette", "Ciabatta", "Pain de seigle", "Wrap", "Pain aux céréales"]
  );

  const sauces = ref<string[]>(
    savedSauces.length > 0
      ? savedSauces
      : [
          "Mayonnaise",
          "Moutarde",
          "Pesto",
          "Sauce barbecue",
          "Sauce aigre-douce",
        ]
  );

  const cheeses = ref<string[]>(
    savedCheeses.length > 0
      ? savedCheeses
      : ["Cheddar", "Mozzarella", "Gouda", "Emmental", "Roquefort"]
  );

  const fillings = ref<string[]>(
    savedFillings.length > 0
      ? savedFillings
      : ["Jambon", "Poulet", "Saumon", "Thon", "Bacon"]
  );

  const sandwiches = ref<string[]>(savedSandwiches);
  const favoriteSandwiches = ref<string[]>(savedFavorites);

  const addSandwich = (sandwich: string) => {
    sandwiches.value.push(sandwich);
  };

  const addToFavorites = (sandwich: string) => {
    if (!favoriteSandwiches.value.includes(sandwich)) {
      favoriteSandwiches.value.push(sandwich);
    }
  };

  const addIngredient = (category: IngredientCategory, ingredient: string) => {
    if (category in { breads, sauces, cheeses, fillings }) {
      const categoryRef = { breads, sauces, cheeses, fillings }[category];
      categoryRef.value.push(ingredient);
    }
  };

  const removeIngredient = (category: IngredientCategory, index: number) => {
    if (category in { breads, sauces, cheeses, fillings }) {
      const categoryRef = { breads, sauces, cheeses, fillings }[category];
      categoryRef.value.splice(index, 1);
    }
  };

  watch(
    () => [sandwiches.value, favoriteSandwiches.value],
    ([newSandwiches, newFavorites]) => {
      localStorage.setItem("sandwiches", JSON.stringify(newSandwiches));
      localStorage.setItem("favoriteSandwiches", JSON.stringify(newFavorites));
    },
    { deep: true }
  );

  watch(
    () => [breads.value, sauces.value, cheeses.value, fillings.value],
    ([newBreads, newSauces, newCheeses, newFillings]) => {
      localStorage.setItem("breads", JSON.stringify(newBreads));
      localStorage.setItem("sauces", JSON.stringify(newSauces));
      localStorage.setItem("cheeses", JSON.stringify(newCheeses));
      localStorage.setItem("fillings", JSON.stringify(newFillings));
    },
    { deep: true }
  );

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
