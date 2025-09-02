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
            <button @click="addIngredient">Add</button>
        </div>
        <ul class="ingredient-list">
            <li v-for="(ingredient, index) in selectedIngredients" :key="index" class="ingredient-item">
                <span class="ingredient-name">{{ ingredient }}</span>
                <button @click="removeIngredient(index)" class="remove-btn">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDefaultStore } from '@/stores/use-default-store';

const store = useDefaultStore();

const selectedCategory = ref('breads');
const newIngredient = ref('');

const selectedIngredients = computed(() => store[selectedCategory.value as keyof typeof store]);

const addIngredient = () => {
    if (newIngredient.value.trim()) {
        store.addIngredient(selectedCategory.value, newIngredient.value.trim());
        newIngredient.value = '';
    }
};

const removeIngredient = (index: number) => {
    store.removeIngredient(selectedCategory.value, index);
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
