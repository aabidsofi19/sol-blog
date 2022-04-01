<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goToEditor = () => router.push({ name: "create-post" });
</script>

<template>
  <div
    class="bg-secondary items-center h-1/2 px-10 border-b-2 flex flex-wrap border-black"
  >
    <div class="text-left pb-10 pl-8 w-full md:w-1/2">
      <p class="container text-5xl font-bold text-light font-montserrat my-4">
        SolBlog is a Decentralized Blogging Platform . <br class="my-4" />
        Made for for people to make an impact on the world
      </p>

      <p class="my-2 open-sans text-lg font-medium text-accent-light">
        It's easy and free to post your thinking on any topic and connect with
        millions of readers.
      </p>

      <button
        @click="goToEditor"
        class="rounded px-4 py-2 mt-3 bg-white text-black border-2 border-black"
      >
        Start Writing
      </button>
    </div>
    <div class="w-full md:w-1/2 h-1/2">
      <img src="../../assets/Blogging-bro.svg" alt="" />
    </div>
  </div>
</template>
