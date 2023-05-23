<script setup>
import EditForm from '../components/EditForm.vue';
import { useDishStore } from '../stores/dish';
import { useUserStore } from '../stores/user';
import {onBeforeMount, onUnmounted} from 'vue'

const dishStore = useDishStore();
const userStore = useUserStore();

async function sendForm(form) {
    await dishStore.createDish(form);
    window.location.hash = '/';
}

onBeforeMount(() => {
    if(userStore.getToken == null)
        window.location.hash = '/';
})

onUnmounted(() => {
    console.log("unmount")
    dishStore.setDishToEdit(null);
});
</script>

<template>
    <EditForm @submit="sendForm"></EditForm>
</template>

<style>
</style>