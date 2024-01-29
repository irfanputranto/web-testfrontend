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

        router.push({ name: 'article' });
    } catch (err) {
        error.value = 'Invalid email or password';
    }
}
</script>

<template>
    <div class="container mx-auto mt-4">
        <section class="min-h-[1rem]">
        <div class="w-full mx-auto my-96 max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="login()">
                <h2 class="text-center mb-2">Login</h2>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Email
                    </label>
                    <input v-model="email" type="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" placeholder="Email@gmail.com" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input v-model="password" type="password" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <ButtonVue type="submit">Login</ButtonVue>
                </div>
            </form>
        </div>
</section>

    </div>
</template>