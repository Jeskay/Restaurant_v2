<script setup>
import {computed, ref, onBeforeMount} from 'vue'
import HomePage from './views/HomePage.vue'
import LoginPage from './views/LoginPage.vue'
import CreatePage from './views/CreatePage.vue'
import EditPage from './views/EditPage.vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/create': CreatePage,
  '/edit': EditPage,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  console.log("changed", window.location.hash)
  currentPath.value = window.location.hash
})

onBeforeMount(() => {
  userStore.fetchTokenFromLocalStorage();
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})

const authenticated = computed(() => {
  return userStore.getToken != null;
})

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container"> 
      <a class="navbar-brand">Ресторан Шалам-Пополам</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#/">Меню</a>
        </li>
        <li v-if="authenticated" class="nav-item">
          <a class="nav-link" href="#/create">Добавить Блюдо</a>
        </li>
        <li v-else class="nav-item">
          <a class="nav-link" href="#/login">Войти</a>
        </li>
      </ul>
    </div>
    </nav>
  <component :is="currentView"></component>
</template>

<style lang="scss" scoped>
  body {
    background: 
      radial-gradient(10% 10%,#fff 98%,#0000),
      radial-gradient(54% 54%,#0000 98%,#c39f76) 50px 50px;
    background-size:100px 100px;
  }
</style>
