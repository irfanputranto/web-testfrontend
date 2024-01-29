<script setup lang="ts">
defineProps(['title', 'badge', 'description', 'image', 'categories', 'alt', 'location', 'linkName', 'linkParams']);
const defaultImg = '/img/default_card.png';
const handlerImgError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultImg;
}

</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl ">
    <figure >
      <img v-if="image" :src="image" :alt="alt" class="h-48 w-96 object-cover rounded-md"  @error="handlerImgError" />
      <img v-else :src="defaultImg" :alt="alt" class="h-48 w-96 object-cover rounded-md" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
      <router-link :to="{name: linkName, params: linkParams }" v-if="linkName">{{ title }}</router-link>
      <div v-else>{{ title }}</div>
        <div class="badge badge-success text-white" v-if="badge">{{ badge }}</div>
      </h2>
      <span v-if="location" class="text-sm">location : {{ location }}</span>
      <p>{{ description }}</p>

      <div class="card-actions justify-end" v-if="categories">
        <div class="badge badge-outline" v-for="(item, index) in categories" :key="index">{{ item.title }}</div>
      </div>
    </div>

  </div>
</template>