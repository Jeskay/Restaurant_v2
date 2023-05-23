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
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
            <input v-model="state.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Пароль</label>
            <input v-model="state.password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" @click="onCLick" class="btn btn-primary">Войти</button>
    </form>
</template>

<style>
</style>