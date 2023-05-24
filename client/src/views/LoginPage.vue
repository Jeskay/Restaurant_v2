<script setup>
import {reactive, onBeforeMount} from 'vue'
import { useUserStore } from '../stores/user';
const userStore = useUserStore();

const state = reactive({
    email: "",
    password: ""
});

function onCLick() {
    userStore.tryLogin(state.email, state.password).then((res) => {
        window.location.hash = '/'
    })
}

onBeforeMount(() => {
    if(userStore.getToken) {
        window.location.hash = '/'
    }
})

</script>
<template>
    <form class="form">
        <div class="container">
            <label for="exampleInputEmail1" class="form__label">Адрес электронной почты</label>
            <input v-model="state.email" type="email" class="form__input" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="container">
            <label for="exampleInputPassword1" class="form__label">Пароль</label>
            <input v-model="state.password" type="password" class="form__input" id="exampleInputPassword1">
        </div>
        <button type="submit" @click="onCLick" class="button">Войти</button>
    </form>
</template>

<style lang="scss" scoped>
    .form {
        @extend .container, .shadow-lg;
        background-color: aliceblue;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        
        &__label {
            @extend .form-label;

        }

        &__input {
            @extend .form-control;
            max-width: 30vw;
        }
    }
    .container {
        margin-bottom: 0.75rem;
        justify-content: center;
    }
    .button {
        @extend .btn;
        background-color: rgb(82, 221, 152);   
    }
    .button:hover {
        background-color: lightgreen;
    }
    @media only screen and (max-width: 720px) {
        .form {
            width: 80vh;
            &__input {
                max-width: 70vw;
            }
        }
    }
</style>