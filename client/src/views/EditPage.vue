<script setup>
import {onBeforeMount, onUnmounted} from 'vue';
import EditForm from '../components/EditForm.vue';
import { useDishStore } from '../stores/dish';
import { useUserStore } from '../stores/user';
const dishStore = useDishStore();
const userStore = useUserStore();

async function sendForm(form) {
    await dishStore.editDish(dishStore.getDishToEdit.name, form);
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