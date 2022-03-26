<script setup lang="ts">
import { BlogPostAccount } from "types";
import { ProgramAccount } from "@project-serum/anchor";
import { computed, ref, watchEffect } from "vue";
import { addImageFileToImageElem, getFileFromWeb3Result } from "helpers";
import { getFile } from "api/ipfs";
import dayjs from "dayjs";
import { useWallet } from "@solana/wallet-adapter-vue";

interface props {
  post: ProgramAccount<BlogPostAccount>;
}
const imgElem = ref<HTMLImageElement>();
const { post } = defineProps<props>();

const wallet = useWallet();

const createdAt = computed(() => {
  return dayjs(post.account.timestamp.toString()).format("MMM DD, YYYY");
});

const addBannerImage = async (hash: string) => {
  const res = await getFile(hash);
  if (res) {
    const file = await getFileFromWeb3Result(res, 0);
    if (file && imgElem.value) {
      addImageFileToImageElem(imgElem.value, file);
    }
  }
};

const isAuthor = computed(() => {
  return (
    post.account.authority.toString() === wallet.publicKey.value?.toBase58()
  );
});

const updatePost = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
};

watchEffect(async () => {
  if (post) {
    addBannerImage(post.account.bannerIpfsHash as string);
  }
});
</script>

<template>
  <router-link
    :to="{ name: 'post', params: { address: post.publicKey.toString() } }"
    class="flex flex-row justify-end items-start my-10 h-60"
  >
    <div class="text-left pr-3 w-2/3">
      <p class="open-sans font-semibold mb-2 text-black">
        {{ post.account.authority }}
      </p>
      <p
        class="montserrat text-black font-extrabold md:text-xl text-left title"
      >
        {{ post.account.title }}
      </p>
      <div class="flex justify-between">
        <p class="open-sans font-semibold my-3 text-black">
          posted on: {{ createdAt }}
        </p>
        <button v-if="isAuthor" @click="updatePost($event)">Update</button>
      </div>
    </div>

    <img
      ref="imgElem"
      class="h-full w-1/3 object-cover"
      src="https://blog.logrocket.com/wp-content/uploads/2020/01/vue-typescript-tutorial-examples.png"
    />
  </router-link>
  <!--post -->
</template>
