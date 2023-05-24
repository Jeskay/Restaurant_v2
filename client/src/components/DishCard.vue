<script setup>
import {reactive, onMounted} from 'vue'
import {useDishStore} from '../stores/dish'
import { useUserStore } from '../stores/user';
import {Tooltip} from 'bootstrap'

const dishStore = useDishStore();
const userStore = useUserStore();

const props = defineProps({
    dish: Object
});

const state = reactive({
    loading: false,
});

onMounted(() => {
    Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode))
});

function editDish() {
  dishStore.setDishToEdit(props.dish);
  console.log(dishStore.getDishToEdit);
  window.location.hash = "/edit";
};

function deleteDish() {
  state.loading = true;
  dishStore.deleteDish(props.dish.name).then(() => {
    state.loading = false;
  })
};

</script>

<template>
    <div v-if="state.loading" class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="card-dish">
        <img class="card-dish__image" :data-src="dish.image" :src="dish.image"  loading="lazy" alt="" @load="e => e.target.removeAttribute('data-src')">
        <div class="card-dish__body">
            <h3 class="card-dish__header"> {{dish.name}}</h3>
            <h5> Доступные порции </h5>
            <div v-if="dish.portions.length > 0" class="list-portion">
              <button type="button" class="list-portion__item" data-bs-toggle="tooltip" data-bs-placement="bottom" v-for="portion in dish.portions" :key="portion.id" :title="portion.cost + '₽'"> 
                {{portion.amount}} {{portion.measure}}
              </button>
            </div>
            <span v-else class="list-portion--empty">Нет доступных порций</span>
            <div class="card-dish__description">
              <h5>Описание</h5>
              <p>{{dish.description}}</p>
            </div>
        </div>
        <div v-if="userStore.getToken" class="card-dish__footer">
          <button @click="editDish" class="button button--edit">Редактировать</button>
          <button @click="deleteDish" class="button button--delete">Удалить</button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
  .card-dish {
    @extend .card, .mx-auto, .my-5, .p-4;
    max-width:50rem;
    &__image {
      @extend .card-img-top, .img-fluid;
      object-fit: cover; 
      max-height: 50rem;
    }
    &__body {
      @extend .card-body;
    }
    &__header {
      @extend .card-header, .text-center;
    }
    &__description {
      @extend .card-text;
      margin-top: 0.75rem;
    }
    &__footer {
      @extend .card-footer;
      display: flex;
      justify-content: space-between;
    }
  }
  .list-portion {
    display: flex;
    &__item {
      @extend .btn;
      background-color: whitesmoke;
      margin: 0.25rem 0.5rem 0.25rem 0.5rem;
    }
    &--empty {
      @extend .text-muted;
    }
  }

  .button {
    @extend .btn;
    margin-right: 1.25rem;
    width:fit-content;

    &--delete {
      @extend .btn-danger;
    }

    &--edit {
      @extend .btn-warning;
    }
  }
  
</style>
