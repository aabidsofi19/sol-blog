<script setup lang="ts">
import { BlogPostAccount } from "types";
import { ProgramAccount } from "@project-serum/anchor";
import { computed, ref, watchEffect } from "vue";
import { addImageFileToImageElem, getFileFromWeb3Result } from "helpers";
import { getFile } from "api/ipfs";
import dayjs from "dayjs";
import { useWallet } from "solana-wallets-vue";
import BaseButton from "ui/BaseButton.vue";
import DropDownMenu from "ui/DropdownMenu.vue";
import DropDownOption from "ui/BaseDropdownOption.vue";
import { DotsVerticalIcon, BeakerIcon } from "@heroicons/vue/solid";

import { useRouter } from "vue-router";
import BasePill from "ui/BasePill.vue";
import { deletePost } from "api";
import { useWorkspace } from "../composables";

const router = useRouter();
const workspace = useWorkspace();

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

const authorityConcated = computed(() => {
  const authority = post.account.authority.toString();
  return authority.slice(0, 5) + ".." + authority.slice(-5);
});

const isAuthor = computed(() => {
  return (
    post.account.authority.toString() === wallet.publicKey.value?.toBase58()
  );
});

const updatePost = () => {
  router.push({
    name: "update-post",
    params: { postPubKey: post.publicKey.toString() },
  });
};

const deletePost_ = async () => {
  console.log("delete post");

  console.log(workspace);
  if (workspace) {
    console.log("deleting post");
    const { program, provider, wallet } = workspace;

    const tx = await deletePost(
      program.value,
      provider.value,
      post.publicKey.toString()
    );

    router.go(0);
    console.log("deleted :", tx);
  }
};

watchEffect(async () => {
  if (post) {
    addBannerImage(post.account.bannerIpfsHash as string);
  }
});
</script>

<template>
  <div
    class="flex flex-row justify-end items-center my-10 h-min-60 h-auto border border-gray-300 rounded-md shadow-sm"
  >
    <div class="text-left pr-3 w-2/3 p-8">
      <router-link
        :to="{ name: 'post', params: { address: post.publicKey.toString() } }"
        class="montserrat capitalize text-slate-800 font-bold md:text-2xl text-left"
      >
        {{ post.account.title }}
      </router-link>

      <div class="flex justify-between flex-wrap gap-3 py-3">
        <base-pill class="bg-gray-300">{{ authorityConcated }}</base-pill>
        <base-pill disabled>
          {{ createdAt }}
        </base-pill>

        <drop-down-menu v-if="isAuthor">
          <template v-slot:label>
            <DotsVerticalIcon class="h-5 w-5 text-gray-600" />
          </template>

          <drop-down-option @click="updatePost"> Update </drop-down-option>
          <drop-down-option @click="deletePost_"> Delete </drop-down-option>
        </drop-down-menu>
      </div>
      <div class="text-xs font-mono">
        <div class="py-2 px-3 break-words border border-gray-600 rounded my-2">
          Ac : {{ post.publicKey.toString() }}
        </div>
        <div class="py-2 px-3 break-words border border-gray-600 rounded my-2">
          IPFS: {{ post.account.contentIpfsHash.toString() }}
        </div>
      </div>
    </div>

    <div class="bg-red-300 w-1/3 flex">
      <img
        ref="imgElem"
        class="object-cover flex h-80"
        src="https://blog.logrocket.com/wp-content/uploads/2020/01/vue-typescript-tutorial-examples.png"
      />
    </div>
  </div>
  <!--post -->
</template>
