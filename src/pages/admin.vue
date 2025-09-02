<template>
    <div class="container">
        <h2>Admin Panel</h2>
        <select v-model="selectedCategory">
            <option value="breads">Breads</option>
            <option value="sauces">Sauces</option>
            <option value="cheeses">Cheeses</option>
            <option value="fillings">Fillings</option>
        </select>
        <div>
            <input v-model="newIngredient" placeholder="New ingredient">
            <button @click="addNewIngredient">Add</button>
        </div>
        <ul class="ingredient-list">
            <li v-for="(ingredient, index) in selectedIngredients" :key="index" class="ingredient-item">
                <span class="ingredient-name">{{ ingredient }}</span>
                <button @click="removeSelectedIngredient(index)" class="remove-btn">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDefaultStore } from '@/stores/use-default-store';

import type { IngredientCategory } from "@/types";

const store = useDefaultStore();

const { addIngredient, removeIngredient } = store;

const selectedCategory = ref('breads');
const newIngredient = ref('');

const selectedIngredients = computed(() => store[selectedCategory.value as keyof typeof store]);

const addNewIngredient = () => {
    if (newIngredient.value.trim()) {
        addIngredient(selectedCategory.value as IngredientCategory, newIngredient.value.trim());
        newIngredient.value = '';
    }
};

const removeSelectedIngredient = (index: number) => {
    removeIngredient(selectedCategory.value as IngredientCategory, index);
};
</script>

<style scoped>
select,
input,
button {
    margin: 5px;
}

.ingredient-list {
    list-style-type: none;
    padding: 0;
}

.ingredient-item {
    margin: 5px 0;
}
</style>
