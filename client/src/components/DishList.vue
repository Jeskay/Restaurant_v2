<script setup>
import {onBeforeMount} from 'vue';
import DishFilterPanel from './DishFilterPanel.vue';
import DishCard from './DishCard.vue';
import { useDishStore } from '../stores/dish';
import {useCategoryStore} from '../stores/category';

const dishStore = useDishStore();
const categoryStore = useCategoryStore();

async function onCategorySelected() {
    console.log("selected")
    const category = categoryStore.getCurrentCategory
    console.log(category)
    await dishStore.fetchDishList(category)
    console.log(dishStore.getDishes)
}

onBeforeMount( async () => {
    await categoryStore.fetchCategories();
    if(categoryStore.getCategories.length > 0) {
        console.log("mounted")
        const first = categoryStore.getCategories[0];
        categoryStore.setCurrentCategory(first.name);
        await onCategorySelected();
    }
})
</script>

<template>
    <div class="container">
        <DishFilterPanel @category-selected="onCategorySelected"></DishFilterPanel>
        <DishCard v-for="item in dishStore.getDishes" :key="item.name" :dish="item">
        </DishCard>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        background-color: aliceblue;
    }
    
    @media only screen and (max-width: 720px) {
        .container{
          width: 80vh;
        }
    }
</style>