<template>
  <div class="container mx-auto navbar bg-base-100">
    <div class="flex-1">
    <router-link to="/" class="btn btn-ghost text-xl">Business</router-link>
    </div>

    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/" active-class="btn-active">Home</router-link></li>
        <li><router-link :to="{name:'login'}" active-class="btn-active" v-if="store.isAuthenticated === false">Login</router-link></li>
        <li><router-link :to="{ name: 'article'}" active-class="btn-active" v-if="store.isAuthenticated === true">Add Article</router-link></li>
        <li><button @click.prevent="logout()" active-class="btn-active" v-if="store.isAuthenticated === true">Logout</button></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const store = useAuthStore();

const logout = () => {
  store.logout();
  router.push({name: 'home'});
};
</script>
