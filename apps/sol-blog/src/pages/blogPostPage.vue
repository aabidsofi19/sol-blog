<script setup lang="ts">
// import { Blog } from "../../../../target/types/blog";
import navBar from "../components/ui/navBar.vue";
import { ref, computed, onMounted, Ref, watchEffect } from "vue";
import { useWorkspace } from "../composables/useWorkspace";
import { fetchPost } from "api/index";
import { getFile } from "api/ipfs";
import { useRoute } from "vue-router";
import { BlogPostAccount } from "types";
import { addImageFileToImageElem, getFileFromWeb3Result } from "helpers";
import dayjs from "dayjs";

const content = ref("");
const imgElem = ref<HTMLImageElement>();
const loading = ref(true);
const workplace = useWorkspace();
const program = workplace?.program;

const post: Ref<BlogPostAccount | null> = ref(null);

const createdAgo = computed(() => {
  if (post.value) {
    return dayjs(post.value.timestamp.toString()).fromNow();
  }
});

const createdAt = computed(() => {
  if (post.value) {
    return dayjs(post.value.timestamp.toString()).format("lll");
  }
});

const route = useRoute();

const getPostContent = async (hash: string) => {
  const res = await getFile(hash);
  if (res) {
    const content = await getFileFromWeb3Result(res, 0);
    return content ? content.text() : "";
  }
  return "";
};

const addBannerImage = async (hash: string) => {
  const res = await getFile(hash);
  if (res) {
    const file = await getFileFromWeb3Result(res, 0);
    if (file && imgElem.value) {
      addImageFileToImageElem(imgElem.value, file);
    }
  }
};

onMounted(async () => {
  let { id } = route.params;

  if (!program?.value) {
    return;
  }
  let postData = await fetchPost(
    program.value,
    route.params.address.toString()
  );

  if (postData) {
    post.value = postData;
    loading.value = false;
  }
});

watchEffect(async () => {
  if (post.value) {
    const postIpfsHash = post.value.contentIpfsHash as string;
    content.value = await getPostContent(postIpfsHash);
    addBannerImage(post.value.bannerIpfsHash as string);
  }
});
</script>
<template>
  <div>
    <nav-bar></nav-bar>

    <div
      class="container mx-auto w-full md:w-2/4 py-8 px-10"
      v-if="!loading && post"
    >
      <h1 class="text-4xl my-10 text-left font-bold text-black montserrat">
        {{ post.title }}
      </h1>
      <div class="text-left py-3">
        <p>posted on : {{ createdAt }} : {{ createdAgo }}</p>
        <p>author : {{ post.authority.toString() }}</p>
      </div>
      <img
        ref="imgElem"
        src="https://miro.medium.com/max/1400/1*vCbbZjOrWt1mclMJFSs6tw.jpeg"
        class="mb-5 w-full h-60 md:h-96 object-cover"
        alt=""
      />

      <div :innerHTML="content" class="prose"></div>
    </div>
  </div>
</template>
