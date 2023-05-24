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
    <div class="form">
      <div v-if="state.loading" class="load-container">
        <div class="load-container__spinner" role="status"></div>
      </div>
      <form v-else  @submit.prevent="submitForm">
        <div class="form__section">
          <label class="form__label form__section__header" for="category">Категория меню</label>
          <div class="form__row">
            <select id="category" name="category" style="width:fit-content" class="form-select">
                <option v-for="item in categoryStore.getCategories" :selected="item.name == state.categoryName" :key="item.name">{{ item.name }}</option>
            </select>
            <input type="text" v-model="state.newCategory">
            <button :disabled="state.newCategory == ''" class="button button__create" @click="createCategory">Создать категорию</button>
          </div>
        </div>
        <div class="form__section">
          <label class="form__label form__section__header" for="name">Название блюда</label>
          <input id="name" type="text" class="form-control" style="width:fit-content" :disabled="state.noMutation" v-model="state.formName" name="dish" placeholder="Ваше блюдо" >
        </div>
        <div class="form__section" v-if="state.noMutation">
          <div class="stack">
            <div v-for="portion in portionStore.getPortionList" :key="portion.measure + portion.amount + portion.cost" class="breadcrumb">
              <span>{{portion.amount}} {{portion.measure}} / {{portion.cost}} ₽</span>
              <button type="button" :id="portion.id" class="breadcrumb__delete" @click="() => portionStore.removePortion(portion)"></button>
            </div>
          </div>
          <CreatePortionInput @create="portionStore.addPortion"></CreatePortionInput>
        </div>
        <div class="form__content">
            <div class="form__section">
              <img v-if="state.url" id="preview" :src="state.url" class="image-fluid">
              <img v-else :src="state.image" class="image-fluid">
            </div>
            <div class="form__section form__file">
                <input class="form__file__input" id="fileInput" type="file" name="image" accept="image/*" @change="loadPreview"/>
                <label class="form__file__label" ref="fileLabel" for="fileInput" data-browse="Загрузить"></label>
            </div>
        </div>
        <div class="form__section">
          <textarea class="form-control" type="text" v-model="state.formDescription" name="description" placeholder="Описание блюда" rows="3"></textarea>
        </div>
          <button :disabled="invalidForm" class="button button__submit" type="submit">Отправить</button>
      </form>
    </div>
</template>

<style lang="scss" scoped>
  .form {
    @extend .container;
    background-color: whitesmoke;
    padding: 0.75rem;

    &__section {
      margin-bottom: 0.75rem;

      &__header {
        font-weight: 500;
      }
    }

    &__row {
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
    }

    &__file {
      @extend .input-group;

      &__input {
        @extend .form-control;
      }

      &__label {
        @extend .form-label;
        margin-right: 0.5rem;
      }
    }
  }
  .stack {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: stretch;
    gap: 0.75rem;
  }
  .button {
    @extend .btn;
    &__submit {
      background-color: rgb(82, 221, 152);
    }
    &__create {
      background-color: rgb(116, 200, 228);
    }
    &__submit:hover {
      background-color: lightgreen;
    }
    &__create:hover {
      background-color: lightblue;
    }
  }
  .breadcrumb {
    padding: 0.5rem;
    background-color: white;
    border: 1px black solid;
    border-radius: 0.25rem;
    &__delete {
      @extend .btn-close;
      margin-left: 0.25rem;
    }
  }
  .load-container {
    justify-content: center;
    display: flex;

    &__spinner {
      @extend .spinner-grow;
    }
  }
</style>