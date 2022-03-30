<script setup lang="ts">
import { ref } from "vue";
import { useLocalStorage, useWallet } from "@solana/wallet-adapter-vue";
import { useWorkspace } from "../composables";

//ui components
import NavBar from "../components/ui/navBar.vue";
import Header1 from "../components/ui/header.vue";
import postsList from "../components/postsList.vue";
import { fetchPosts } from "api";
import { useQuery } from "../composables/usePostApi";

// let posts = ref([]);
// let loading = ref(true);

const workspace = useWorkspace();

const {
  data: posts,
  loading,
  errors,
  refetch,
} = useQuery(fetchPosts, [workspace?.program.value]);

const refetch_ = () => {
  console.log("refecthing");
  refetch();
};

// fetchPosts(program.value)
//   .then((fetchedPosts) => {
//     posts.value = fetchedPosts;
//     loading.value = false;
//   })
//   .catch((err) => console.log("err", err));
</script>

<template>
  <div>
    <nav-bar></nav-bar>
    <header1></header1>

    <div
      v-for="(err, i) in errors"
      class="rounded shadow w-full max-w-5xl p-2 my-3 mx-auto bg-red-200 text-red-900 font-mono"
    >
      {{ err }}
    </div>

    <!-- {{posts}} -->
    <posts-list
      v-if="!loading && posts"
      :posts="posts"
      @refetch="refetch_"
    ></posts-list>
    <div v-else>Loading Posts ...</div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
