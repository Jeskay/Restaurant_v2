<script setup>
import {computed, onBeforeMount} from 'vue'
import { useCategoryStore } from '../stores/category';

const store = useCategoryStore();

const emit = defineEmits(['categorySelected']);

function selectCategory(event) {
    store.setCurrentCategory(event.target.value);
    emit('categorySelected');
};

</script>

<template>
    <div class="text-center" style="border-bottom: 2px solid black; padding: 2rem;">
      <h3> Выберите категорию меню </h3>
      <select class="form-select" @change="selectCategory">
        <option v-for="category in store.getCategories" :key="category.name" :value="category.name" >
          {{ category.name }}
        </option>
      </select>
    </div>
</template>

<style lang="scss" scoped>

</style>