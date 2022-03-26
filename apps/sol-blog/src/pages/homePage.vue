<script setup lang="ts">
import { ref } from "vue";
import { useLocalStorage, useWallet } from "@solana/wallet-adapter-vue";
import { useWorkspace } from "../composables";

//ui components
import NavBar from "../components/ui/navBar.vue";
import Header1 from "../components/ui/header.vue";
import postsList from "../components/postsList.vue";
import { fetchPosts } from "api";

let posts = ref([]);
let loading = ref(true);

const { program } = useWorkspace();
fetchPosts(program.value)
  .then((fetchedPosts) => {
    posts.value = fetchedPosts;
    loading.value = false;
  })
  .catch((err) => console.log("err", err));
</script>

<template>
  <div>
    <nav-bar></nav-bar>
    <header1></header1>
    <!-- {{posts}} -->
    <posts-list v-if="!loading" :posts="posts"></posts-list>
    <div v-else>Loading Posts ...</div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
