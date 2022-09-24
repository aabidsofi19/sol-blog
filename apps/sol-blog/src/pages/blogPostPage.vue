<script setup lang="ts">
// import { Blog } from "../../../../target/types/blog";
import navBar from "../components/ui/navBar.vue";
import { ref, computed, onMounted, Ref, watchEffect } from "vue";
import { useWorkspace } from "../composables/useWorkspace";
import { fetchPost } from "api/index";
import { getFile } from "api/ipfs";
import { useRoute, useRouter } from "vue-router";
import { BlogPostAccount } from "types";
import { addImageFileToImageElem, getFileFromWeb3Result } from "helpers";
import dayjs from "dayjs";
import BasePill from "ui/BasePill.vue";
const router = useRouter();
const content = ref("");
const imgElem = ref<HTMLImageElement>();
const loading = ref(true);
const workplace = useWorkspace();
const program = workplace?.program;

const post: Ref<BlogPostAccount | null> = ref(null);

const goToUserPosts = () => {
  const userPubKey = post.value?.authority.toBase58();
  if (!userPubKey) {
    return;
  }
  router.push({
    name: "user-posts",
    params: {
      id: userPubKey,
    },
  });
};

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

const authorityConcated = computed(() => {
  const authority = post.value?.authority.toString();
  return authority?.slice(0, 5) + ".." + authority?.slice(-5);
});

const postPubKey = computed(() => route.params.address);

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
      <h1
        class="text-4xl capitalize mt-10 text-left font-bold text-black montserrat"
      >
        {{ post.title }}
      </h1>
      <div class="flex gap-3 py-3 mb-3">
        <base-pill disabled @click="goToUserPosts" class="cursor-pointer">
          {{ authorityConcated }}
        </base-pill>
        <base-pill disabled>{{ createdAgo }}</base-pill>
        <base-pill disabled>{{ createdAt }}</base-pill>
      </div>
      
      <img
        ref="imgElem"
        src="../assets/css-loader-minimal.gif"
        class="mb-5 w-full h-60 md:h-96 object-cover rounded shadow"
        alt=""
      />
     
      <div
        v-if="content" 
        :innerHTML="content"
        class="prose text-left max-w-none md:prose-xl"
      ></div>

      <div v-else class="text-4xl text-bold font-montserrat py-6">
        Loading Content ...
      </div>


      <div class="text-xs text-left font-mono mt-4">
        <div class="py-2 px-3 break-words border border-gray-600 rounded my-2">
          Ac : {{ postPubKey }}
        </div>
        <div class="py-2 px-3 break-words border border-gray-600 rounded my-2">
          IPFS: {{ post.contentIpfsHash.toString() }}
        </div>
        <div class="py-2 px-3 break-words border border-gray-600 rounded my-2">
          authority: {{ post.authority.toString() }}
        </div>
      </div>
    </div>
  </div>
</template>
