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
    <div class="header header--bold">
      <h3> Выберите категорию меню </h3>
      <select class="select-form" @change="selectCategory">
        <option v-for="category in store.getCategories" :key="category.name" :value="category.name" >
          {{ category.name }}
        </option>
      </select>
    </div>
</template>

<style lang="scss" scoped>
  .header {
    @extend .text-center;
    background-color:transparent;
    &--bold {
      border-bottom: 2px solid black; 
      padding: 2rem;
    }
    .select-form {
      @extend .form-select;
      max-width: fit-content;
      margin: auto;
    }
  }
</style>