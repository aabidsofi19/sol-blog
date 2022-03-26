<script setup lang="ts">
import { useWallet } from "@solana/wallet-adapter-vue";
import { useWorkspace } from "../composables";
import { ref, computed, watchEffect } from "vue";
import { authorFilter, fetchPosts } from "api";
import navBar from "../components/ui/navBar.vue";
import { ProgramAccount } from "@project-serum/anchor";
import { BlogPostAccount } from "types";
import postsList from "../components/postsList.vue";

const workspace = useWorkspace();
const wallet = useWallet();

const authorBase58 = computed(async () => {
  return wallet.publicKey.value?.toBase58();
});

const getPosts = async () => {
  const author = await authorBase58.value;
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
  <div v-if="wallet.connected">
    <posts-list :posts="posts" />
  </div>
  <div v-else>connect to wallet first</div>
</template>
