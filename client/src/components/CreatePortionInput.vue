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
    <div class="group">
        <input class="group__input" v-model="state.amount" type="number"  placeholder="Количество">
        <input class="group__input" v-model="state.measure" type="text" placeholder="Мера измерения">
        <span class="group__text">/</span>
        <input class="group__input" v-model="state.cost" type="number" placeholder="Цена">
        <span class="group__text">₽</span>
        <button class="button" @click="add" :disabled="emptyInput" type="button" >Добавить</button>
    </div>
</template>

<style lang="scss" scoped>
    .group {
        @extend .input-group;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
        width:fit-content;
        &__input {
            @extend .form-control;
        }
        &__text {
            @extend .input-group-text;
        }
    }
    .button {
        @extend .btn;
        background-color: rgb(116, 200, 228);
    }
    .button:hover {
        background-color: lightblue;
    }
</style>