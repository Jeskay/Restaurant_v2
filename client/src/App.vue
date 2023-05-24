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
  <nav class="navigation">
    <div class="container"> 
      <a class="navigation__brand">Ресторан Шалам-Пополам</a>
      <ul class="navigation__list">
        <li class="navigation__list__item">
          <a class="nav-link" href="#/">Меню</a>
        </li>
        <li v-if="authenticated" class="navigation__list__item">
          <a class="nav-link" href="#/create">Добавить Блюдо</a>
        </li>
        <li v-else class="navigation__list__item">
          <a class="nav-link" href="#/login">Войти</a>
        </li>
      </ul>
    </div>
    </nav>
  <component :is="currentView"></component>
</template>

<style lang="scss" scoped>

.navigation {
    @extend .navbar, .navbar-expand-lg, .shadow-sm;
    background-color: rgb(222, 238, 252);

    &__brand {
      @extend .navbar-brand;
    }

    &__list {
      @extend .navbar-nav;

      &__item {
        @extend .nav-item;
      }
    }
}

</style>
