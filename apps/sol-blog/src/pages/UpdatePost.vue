<script setup lang="ts">
import postEditor from "../components/editor/editor.vue";
import useEditor from "../composables/useEditor";
import navBar from "@/components/editor/navBar.vue";
import { useWorkspace } from "../composables";
import { useUpdatePost } from "../composables/usePostApi";
import { BlogProgram } from "types";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { fetchPost } from "api";
import { getFile } from "api/ipfs";
import { getFileFromWeb3Result } from "helpers";
import { Provider } from "@project-serum/anchor";
import { Web3File } from "web3.storage";

const { postData, setPostData } = useEditor();

const { error, publishPost, status, publishing } = useUpdatePost();
const workspace = useWorkspace();
const route = useRoute();
const loading = ref(true);

const postPubKey = route.params.postPubKey as string;

onMounted(async () => {
  const program = workspace?.program.value as BlogProgram;
  const post = await fetchPost(program, postPubKey);
  const imRes = await getFile(post.bannerIpfsHash as string);
  let imgfile: Web3File | undefined;
  let content: string = "";
  try {
    if (imRes) {
      imgfile = await getFileFromWeb3Result(imRes, 0);
      console.log("imhg", imgfile);
    }
    const contentRes = await getFile(post.contentIpfsHash as string);
    if (contentRes) {
      const file = await getFileFromWeb3Result(contentRes, 0);
      content = (await file?.text()) ?? "";
    }
  } finally {
    setPostData(
      {
        title: post.title as string,
        banner: imgfile,
        content: content as string,
      },
      postPubKey
    );
    console.log("postData", postData.value);
    loading.value = false;
  }
});

const publish = () => {
  publishPost(
    postData.value,
    postPubKey,
    workspace?.program.value as BlogProgram,
    workspace?.provider.value as Provider
  );
};
</script>

<template>
  <nav-bar
    @onPublish="publish"
    :status="status"
    :publishing="publishing"
  ></nav-bar>

  {{ error }}
  <post-editor :postKey="postPubKey" v-if="!loading"> </post-editor>
</template>
