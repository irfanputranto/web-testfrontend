<script setup lang="ts">
import ButtonVue from '../../components/Button.vue';
import { ref } from 'vue';
import { useArticleStore } from '../../store/articleStore';
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const title = ref('');
const content = ref('');
const image = ref<File | null>(null);
const toast = useToast();

const articleStore = useArticleStore();
const userStore = useAuthStore();
const router = useRouter();
const isSave = ref(false);

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        image.value = input.files[0];
    }
};

const submit = async () => {
    isSave.value = true;
    try {
        await userStore.checkUser();
        const userId = userStore.userData;

    if (title.value && content.value && image.value) {
       await articleStore.store(title.value, content.value, image.value, userId.id);
        title.value = '';
        content.value = '';
        image.value = null;
        toast.success("Data add successfully", {
        timeout: 2000
      });
      router.push({name: 'home'});
    }
} catch (error: any) {
    if (error === 'Error: Invalid credentials') {
        console.log(error);
    }
    
    if (error.response.status === 400) {
        isSave.value = false;
        toast.error(error.response.data.message.image[0], {
            timeout: 3000
        });
    }
    router.push({name: 'article'});
    } 
}

</script>

<template>
    <div class="container mx-auto">
        <form @submit.prevent="submit">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
                <div class="flex flex-warp -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-title">
                            Title <span class="text-warning">*</span>
                        </label>
                        <input
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-title" type="text" placeholder="Baloney" v-model="title" required>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password">
                            Content <span class="text-warning">*</span>
                        </label>
                        <textarea cols="10" rows="5"
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Fill Content" v-model="content" required></textarea>
                    </div>

                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-password">
                            Image <span class="text-warning">*</span>
                        </label>
                        <input type="file" class="file-input file-input-bordered w-full max-w-xs" id="image"
                            accept=".jpeg,.png,.jpg,.gif,.svg" @change="handleFileChange" required/>
                    </div>
                </div>

                <ButtonVue type="submit" :disabled="isSave">Save</ButtonVue>
            </div>
        </form>
</div></template>