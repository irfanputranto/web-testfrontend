<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import VideosVue from '../components/Videos.vue';
import { useArticleStore } from '../store/articleStore';
import LoadingVue from '../components/Loading.vue';

const articleStore = useArticleStore();
const route = useRoute();

const detailIds = ref<string[]|string>(route.params.id);

onMounted(() => {
    articleStore.show(detailIds.value);
})
</script>

<template>
    <div class="flex" v-if="articleStore.isLoading">
        <LoadingVue />
    </div>

    <div class="min-h-screen">
            <div class="container mx-auto mt-2">
                <div v-if="articleStore.dataFirst">
                <VideosVue class-name="ml-56" :video-source="articleStore.dataFirst.data.video" :title-name="articleStore.dataFirst.data.title" :deskripsi="articleStore.dataFirst.data.content" />
                </div>
            </div>
    </div>
</template>