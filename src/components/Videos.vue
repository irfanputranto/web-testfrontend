<template>
    <div class="card w-full bg-base-100 shadow-xl ">
        <div class="relative w-full max-w-screen-lg mx-auto mt-12">
            <video ref="videoPlayer" controls class="w-full h-96 block bg-slate-400 rounded-lg" v-if="videoSource">
                <source :src="videoSource" type="video/mp4" />
                Your browser does not support the video.
            </video>
            <div v-else>
                <p class="text-md mx-auto">No Videos</p>
            </div>
            <div class="card-body">
                <h2 class="card-title">
                    <p class="text-2xl">{{ titleName }}</p>
                </h2>
                <p class="text-md">{{ deskripsi }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps(['videoSource', 'width', 'height', 'className', 'titleName', 'deskripsi']);
const videoPlayer = ref<HTMLVideoElement | null>(null);

onMounted(() => {
    if (videoPlayer.value) {
        videoPlayer.value.addEventListener('ended', () => {
            console.log("Video has ended");
        })
    }
})
</script>
