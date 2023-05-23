<script setup>
import {reactive, onMounted} from 'vue'
import {useDishStore} from '../stores/dish'
import {Tooltip} from 'bootstrap'

const dishStore = useDishStore();

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
    <div v-else class="card mx-auto my-5 p-4" style="max-width:50rem;">
        <img :src="dish.image" class="card-img-top img-fluid" style="object-fit: cover; max-height: 50rem;">
        <div class="card-body">
            <h3 class="card-header text-center"> {{dish.name}}</h3>
            <h5> Доступные порции </h5>
            <div v-if="dish.portions.length > 0" class="d-flex">
              <button type="button" class="btn bg-light mx-2 my-1" data-bs-toggle="tooltip" data-bs-placement="bottom" v-for="portion in dish.portions" :key="portion.id" :title="portion.cost + '₽'"> 
                {{portion.amount}} {{portion.measure}}
              </button>
            </div>
            <span v-else class="text-muted">Нет доступных порций</span>
            <div class="mt-3">
              <h5>Описание</h5>
              <p class="card-text">{{dish.description}}</p>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <button @click="editDish" class="btn btn-primary btn-dm mr-5" style=" width:fit-content">Редактировать</button>
          <button @click="deleteDish" class="btn btn-danger btn-md mr-5" style=" width:fit-content">Удалить</button>
        </div>
    </div>
</template>


<style>

</style>
