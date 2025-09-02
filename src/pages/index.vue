<template>
  <div class="container">
    <h1>Sandwich 3000</h1>
    <div class="filters">
      <select v-model="selectedBread">
        <option value="">Select Bread</option>
        <option v-for="bread in breads" :key="bread" :value="bread">{{ bread }}</option>
      </select>

      <select v-model="selectedSauce">
        <option value="">Select Sauce</option>
        <option v-for="sauce in sauces" :key="sauce" :value="sauce">{{ sauce }}</option>
      </select>

      <select v-model="selectedCheese">
        <option value="">Select Cheese</option>
        <option v-for="cheese in cheeses" :key="cheese" :value="cheese">{{ cheese }}</option>
      </select>

      <select v-model="selectedFilling">
        <option value="">Select Filling</option>
        <option v-for="filling in fillings" :key="filling" :value="filling">{{ filling }}</option>
      </select>
    </div>
    <div class="sandwich-list">
      <ul v-if="sandwiches && sandwiches.length > 0">
        <h2>Created sandwiches:</h2>
        <li v-for="sandwich in sandwiches" :key="sandwich">
          {{ sandwich }}
        </li>
      </ul>
      <ul v-if="favoriteSandwiches && favoriteSandwiches.length > 0">
        <h2>Favorite Sandwiches:</h2>
        <li v-for="favoriteSandwich in favoriteSandwiches" :key="favoriteSandwich">
          {{ favoriteSandwich }}
        </li>
      </ul>
      <ul v-if="isFiltering">
        <h2>Filtered sandwiches:</h2>
        <li v-for="filteredSandwich in filteredSandwiches" :key="filteredSandwich">
          {{ filteredSandwich }}
        </li>
      </ul>
    </div>
    <h3>{{ createdSandwich }}</h3>
    <div class="button-group">
      <button @click="makeSandwich">Make a sandwich</button>
      <button @click="saveSandwich(createdSandwich)">Save sandwich</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDefaultStore } from '@/stores/use-default-store';

const store = useDefaultStore();

const {
  breads,
  sauces,
  cheeses,
  fillings,
  sandwiches,
  addSandwich,
  favoriteSandwiches,
  addToFavorites
} = store;

const createdSandwich = ref<string>('');
const selectedBread = ref<string>('');
const selectedSauce = ref<string>('');
const selectedCheese = ref<string>('');
const selectedFilling = ref<string>('');

const isFiltering = computed(() => {
  return selectedBread.value || selectedSauce.value || selectedCheese.value || selectedFilling.value;
});

const filteredSandwiches = computed(() => {
  return sandwiches.filter(sandwich => {
    const matchesBread = !selectedBread.value || sandwich.includes(selectedBread.value);
    const matchesSauce = !selectedSauce.value || sandwich.includes(selectedSauce.value);
    const matchesCheese = !selectedCheese.value || sandwich.includes(selectedCheese.value);
    const matchesFilling = !selectedFilling.value || sandwich.includes(selectedFilling.value);
    return matchesBread && matchesSauce && matchesCheese && matchesFilling;
  });
});


const makeSandwich = (): void => {
  const randomBread = breads[Math.floor(Math.random() * breads.length)];
  const randomSauce = sauces[Math.floor(Math.random() * sauces.length)];
  const randomCheese = cheeses[Math.floor(Math.random() * cheeses.length)];
  const randomFilling = fillings[Math.floor(Math.random() * fillings.length)];
  createdSandwich.value = `${randomBread} with ${randomSauce}, ${randomCheese}, and ${randomFilling}`;
  addSandwich(createdSandwich.value);
};

const saveSandwich = (sandwich: string): void => {
  if (sandwich && !favoriteSandwiches.includes(sandwich)) {
    addToFavorites(sandwich);
  }
};


</script>
<style scoped>
.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.sandwich-list {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

ul {
  flex: 1;
  text-align: left;
  padding: 0;
  list-style-type: none;
}

h2 {
  margin-top: 0;
}

.button-group {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>