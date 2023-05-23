<script setup>
import {reactive, computed} from 'vue'

const state = reactive({
    amount: 0,
    measure: 'г.',
    cost: 0,
});

const emit = defineEmits(['create'])

const emptyInput = computed(() => {
    return state.amount == 0 || state.measure == '' || state.cost == 0
});

function add() {
    emit('create', state.amount, state.measure, state.cost);
    state.amount = 0;
    state.cost = 0;
    state.measure = '';
}
</script>

<template>
    <div class="input-group mb-3 my-3" style="width:fit-content">
        <input v-model="state.amount" type="number" class="form-control" placeholder="Количество">
        <input v-model="state.measure" type="text" class="form-control" placeholder="Мера измерения">
        <span class="input-group-text">/</span>
        <input v-model="state.cost" type="number" class="form-control" placeholder="Цена">
        <span class="input-group-text">₽</span>
        <button @click="add" :disabled="emptyInput" type="button" class="btn bg-primary">Добавить</button>
    </div>
</template>

<style>

</style>