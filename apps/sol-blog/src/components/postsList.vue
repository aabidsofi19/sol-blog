<script setup lang="ts">
import { BlogPostAccount } from "types";
import { defineProps } from "vue";
import { ProgramAccount } from "@project-serum/anchor";
import postListItem from "./postListItem.vue";

interface props {
  posts: ProgramAccount<BlogPostAccount>[];
}
const props = defineProps<props>();
</script>

<template>
  <div class="w-full p-3 max-w-4xl mx-auto">
    <post-list-item
      :post="post"
      v-for="post in posts"
      :key="post.publicKey.toString()"
    >
    </post-list-item>
  </div>
</template>
