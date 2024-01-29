<script setup lang="ts">
import CardVue from "../components/Card.vue";
import HeroVue from "../components/Hero.vue";
import { ref, onMounted } from "vue";
import ButtonVue from "../components/Button.vue";
import InputFilter from "../components/Input.vue";
import LoadingVue from "../components/Loading.vue";
import { useArticleStore } from "../store/articleStore";

const articleStore = useArticleStore();

const inputNameFilter = ref('');
const handlerInputFilter = (value: string) => {
    inputNameFilter.value = value;
}

const filterDatas = () => {
    dataArticle({
        title: inputNameFilter.value,
        alias: inputNameFilter.value,
        limit: articleStore.limit,
        offset: articleStore.offset,
    });
}

const dataArticle = async (params = {
    title: '',
    alias: '',
    limit: 10,
    offset: 0
}) => {
    await articleStore.get({
        title: params.title,
        alias: params.alias,
        limit: params.limit,
        offset: params.offset
    });
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

// const prevPage = () => {
//     if (articleStore.currentPage > 1) {
//         articleStore.currentPage--;
//         dataArticle({
//             title: '',
//             alias: '',
//             limit: articleStore.itemsPerPage,
//             offset: offset,
//         })
//     }
// }

// const totalPages = Math.ceil()

// const nextPage = () => {
//     if (articleStore.data.meta.current_page < articleStore.data.meta.total) {
//         articleStore.data.meta.current_page++;
//         dataArticle({
//             title: '',
//             alias: '',
//             limit: articleStore.itemsPerPage,
//             offset: offset,
//         })
//     }
// }

// const offset = (articleStore.currentPage - 1) * articleStore.itemsPerPage;

onMounted(() => {
    scrollToTop();
    dataArticle({ 
        title: '',
        alias: '',
        limit: articleStore.limit,
        offset: articleStore.offset,
    });
});
</script>

<template>
    <HeroVue>
        <section>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <form action="#">

                        <div class="flex flex-col lg:flex-row relative">
                            <input-filter :placeholder="'Enter search'" @input-text-custom="handlerInputFilter"
                                :class="'w-full lg:w-[120%] max-w-xs mb-2 mr-2 lg:ml-4'" />

                            <button-vue class="btn btn-success text-white" @click.prevent="filterDatas()"
                                :class="'lg:ml-24'"><font-awesome-icon icon="search" /></button-vue>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    </HeroVue>

    <section class="min-h-screen">

        <div class="container mt-5 ml-2 lg:mx-auto">
            <!-- loading  -->
            <div class="flex" v-if="articleStore.isLoading">
                <LoadingVue />
            </div>
            <!-- loading  -->

            <!-- data list product business -->
            <div v-if="!articleStore.isLoading && articleStore.data.meta">
                <div class="flex flex-wrap justify-center">
                    <CardVue v-for="(article) in articleStore.data.data" :key="article.id" :title="article.title"
                        :alt="article.alias"
                        :description="article.content"
                        :image="article.image"
                        :link-params="{ id: article.id }" class="mt-5 mr-5 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/4 lg:mr-5" />
                </div>

                <div class="text-center mt-5">
                    <!-- <div class="join">
                        <button class="join-item btn" @click="prevPage" :disabled="articleStore.currentPage === 1" :class="{'cursor-not-allowed': articleStore.currentPage === 1}" ><</button>
                        <button class="join-item btn">Page {{ articleStore.currentPage }}</button>
                        <button class="join-item btn" @click="nextPage" :disabled="articleStore.currentPage === articleStore.data.meta.total" :class="{'cursor-not-allowed' : articleStore.currentPage === articleStore.data.meta.total}">></button>
                    </div> -->
                    <!-- <PaginationVue :total-items="articleStore.data.meta.total" :items-per-page="articleStore.data.meta.per_page"
                        :offset="20" @page-change="handlePageChange"></PaginationVue> -->
                </div>
            </div>
        </div>
    </section>
</template>

