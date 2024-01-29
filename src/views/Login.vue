<script setup lang="ts">
import ButtonVue from '../components/Button.vue';
import { ref } from "vue";
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const authStore = useAuthStore();
const login = async () => {
    try {
        await authStore.login(email.value, password.value);

        router.push({name: 'article'});
    } catch (err) {
       error.value = 'Invalid email or password';
    }
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login()">
            <label for="email">Email:</label>
            <input v-model="email" type="email" required>
            <br />
            
            <label for="password">Password:</label>
            <input v-model="password" type="password" required>
            <br />
           <ButtonVue type="submit">Login</ButtonVue>
            <p v-if="error" class="text-red-800">{{ error }}</p>
        </form>
    </div>
</template>