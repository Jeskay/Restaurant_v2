<script setup>
import {reactive, onBeforeMount, computed} from 'vue';
import CreatePortionInput from './CreatePortionInput.vue';
import { useCategoryStore } from '../stores/category';
import { useDishStore } from '../stores/dish';
import { usePortionStore } from '../stores/portion';

const categoryStore = useCategoryStore();
const dishStore = useDishStore();
const portionStore = usePortionStore();

const state = reactive({
    loading: false,
    url: null,
    noMutation: false,
    formName: "",
    formDescription: "",
    newCategory: "",
    categoryName: null,
    image: ""
});

const emit = defineEmits(['submit']);

onBeforeMount(() => {
    state.loading = true;
    categoryStore.fetchCategories().then(() => {
        state.loading = false;
    });
    const dish = dishStore.getDishToEdit;
    console.log(dish);
    if(!dish)
        return;
    if(dish.name) {
        state.noMutation = true;
        portionStore.setPortionList(dish.portions);
    }
    state.image = dish.image ?? "";
    state.categoryName = dish.categoryName ?? "";
    state.formName = dish.name ?? "";
    state.formDescription = dish.description ?? "";
});

const invalidForm = computed(() => {
    return !((state.image || state.url) && state.formName && state.formDescription);
});

async function submitForm(event) {
    state.loading = true;
    const formData = new FormData(event.target)
    if(state.noMutation) {
        const res = await dishStore.postPortionList(state.formName, portionStore.getPortionList);
        console.log(res);
    }
    emit('submit', formData);
}

async function createCategory() {
    state.loading = true;
    await categoryStore.postCategory(state.newCategory);
    state.loading = false;
}

function loadPreview(event) {
    const file = event.target.files[0];
    if (!file)
        return
    const url = URL.createObjectURL(file);
    state.url = url;
}

</script>

<template>
    <div class="container bg-light p-3">
      <div v-if="state.loading" class="d-flex justify-content-center">
        <div class="spinner-grow" role="status"></div>
      </div>
      <form v-else  @submit.prevent="submitForm">
        <label class="mr-2" for="category">Категория меню</label>
        <div class="d-flex flex-row mb-3">
          <select id="category" name="category" style="width:fit-content" class="form-select">
              <option v-for="item in categoryStore.getCategories" :selected="item.name == state.categoryName" :key="item.name">{{ item.name }}</option>
          </select>
          <div class="mx-3">
            <input type="text" v-model="state.newCategory">
            <button :disabled="state.newCategory == ''" class="btn btn-secondary mx-2" @click="createCategory">Создать категорию</button>
          </div>
        </div>
        <div class="mb-3">
          <label class="mr-2 form-label" for="name">Название блюда</label>
          <input id="name" type="text" class="form-control" style="width:fit-content" :disabled="state.noMutation" v-model="state.formName" name="dish" placeholder="Ваше блюдо" >
        </div>
        <div v-if="state.noMutation">
          <div class="hstack gap-3">
            <div v-for="portion in portionStore.getPortionList" :key="portion.measure + portion.amount + portion.cost" class="bg-white p-2">
              <span>{{portion.amount}} {{portion.measure}} / {{portion.cost}} ₽</span>
              <button type="button" :id="portion.id" class="btn-close ms-2" @click="() => portionStore.removePortion(portion)"></button>
            </div>
          </div>
          <CreatePortionInput @create="portionStore.addPortion"></CreatePortionInput>
        </div>
        <div class="form-group">
            <img v-if="state.url" id="preview" :src="state.url" class="image-fluid">
            <img v-else :src="state.image" class="image-fluid">
            <div class="custom-file">
                <input class="form-control" id="fileInput" type="file" name="image" accept="image/*" @change="loadPreview"/>
                <label class="form-label" ref="fileLabel" for="fileInput" data-browse="Загрузить"></label>
            </div>
        </div>
        <div class="form-group">
          <textarea class="form-control" type="text" v-model="state.formDescription" name="description" placeholder="Описание блюда" rows="3"></textarea>
        </div>
          <button :disabled="invalidForm" class="btn btn-success mt-3" type="submit">Отправить</button>
      </form>
    </div>
</template>

<style>

</style>