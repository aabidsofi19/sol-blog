<script setup lang="ts">
import { useWorkspace } from "../composables";
import { ref, computed, watchEffect } from "vue";
import { authorFilter, fetchPosts } from "api";
import navBar from "../components/ui/navBar.vue";
import { ProgramAccount } from "@project-serum/anchor";
import { BlogPostAccount } from "types";
import postsList from "../components/postsList.vue";
import { useRoute } from "vue-router";

const workspace = useWorkspace();

const route = useRoute();
const authorBase58 = route.params.id as string;

const getPosts = async () => {
  const author = authorBase58;
  if (!workspace) return [];
  if (!author) return [];
  const filter = authorFilter(author);
  return await fetchPosts(workspace.program.value, [filter]);
};

const posts = ref<ProgramAccount<BlogPostAccount>[]>([]);

watchEffect(async () => {
  posts.value = await getPosts();
});
</script>

<template>
  <nav-bar />

  <div class="w-full px-4 mx-auto max-w-7xl py-6">
    <div class="font-lg my-3 text-gray-500 ">
      POSTS BY : <span class="font-semibold">{{ authorBase58 }}</span>
    </div>
    <posts-list :posts="posts" />
  </div>
</template>
