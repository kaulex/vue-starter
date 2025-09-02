import { defineStore } from "pinia";
import { ref } from "vue";

export const useDefaultStore = defineStore("default", () => {
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

  const sandwiches = ref<string[]>([]);
  const favoriteSandwiches = ref<string[]>([]);

  const addSandwich = (sandwich: string) => {
    sandwiches.value.push(sandwich);
  };

  const addToFavorites = (sandwich: string) => {
    if (!favoriteSandwiches.value.includes(sandwich)) {
      favoriteSandwiches.value.push(sandwich);
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
  };
});
