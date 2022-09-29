<script setup>
import { ref } from "vue";
import { useWorkspace } from "../composables";

import postsList from "../components/postsList.vue";
import { fetchPosts } from "api";
import { useQuery } from "../composables/usePostApi";
const workspace = useWorkspace();

const {
  data: posts,
  loading,
  errors,
  refetch,
} = useQuery(fetchPosts, [workspace?.program?.value]);

const refetch_ = () => {
  console.log("refecthing");
  refetch();
};
</script>

<template>
  <div class="bg-stone-100">
    <div class="mx-auto max-w-7xl w-full">
      <div class="py-2">
        <div class="text-2xl text-gray-800 font-semibold font-heading">
          Highlights
        </div>
        <p class="text-lg text-gray-400">
          All the latest updates and community happenings.
        </p>
      </div>

      <div
        v-for="(err, i) in errors"
        class="rounded shadow p-2 my-3 mx-auto bg-red-200 text-red-900 font-mono"
      >
        {{ err }}
      </div>

      <!-- {{posts}} -->
      <posts-list
        v-if="!loading && posts"
        :posts="posts"
        @refetch="refetch_"
      ></posts-list>

      <div v-else-if="loading && errors.length == 0">
        <p class="font-4xl text-bold font-montserrat py-16">
          Loading Posts ...
        </p>
      </div>
    </div>
  </div>
</template>
