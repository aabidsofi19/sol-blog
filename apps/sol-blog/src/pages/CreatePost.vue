<script setup lang="ts">
import postEditor from "../components/editor/editor.vue";
import useEditor from "../composables/useEditor";
import navBar from "@/components/editor/navBar.vue";
import { useWorkspace } from "../composables";
import { useCreateNewPost } from "../composables/usePostApi";
import { BlogProgram } from "types";

const { postData } = useEditor();
const { error, publishPost, status, publishing } = useCreateNewPost();
const workspace = useWorkspace();

const publish = () => {
  publishPost(
    postData.value,
    workspace?.program.value as BlogProgram,
    workspace?.provider.value
  );
};
</script>

<template>
  <nav-bar
    @onPublish="publish"
    :status="status"
    :publishing="publishing"
  ></nav-bar>

  <div
    v-if="error"
    class="rounded shadow w-full max-w-5xl p-2 my-3 mx-auto bg-red-200 text-red-900 font-mono"
  >
    {{ error }}
  </div>

  <post-editor post-key="new-post"> </post-editor>
</template>
