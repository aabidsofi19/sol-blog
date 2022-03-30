<script setup lang="ts">
import { ref, Ref, watchEffect, watch } from "vue";
import * as MediumEditor from "medium-editor";
import { useWallet } from "@solana/wallet-adapter-vue";
import { computed, onMounted, onUnmounted } from "vue";
import { addImageFileToImageElem } from "helpers";
import { BlogPostInputInterface } from "types/index";
import useEditor from "@/src/composables/useEditor";
import { useRouter } from "vue-router";

const { connected } = useWallet();
const contentInput = ref<HTMLElement>();
const bannerImg = ref<HTMLImageElement>();

const {
  setPostData,
  getSavedData,
  postData: postInputData,
  persistPostData,
} = useEditor();
interface Props {
  postKey: string;
}

const props = defineProps<Props>();
const savedData = computed(() => getSavedData(props.postKey));

// if (savedData.value) {
//   setPostData({ ...postInputData.value, ...savedData.value });
// }
// postInputData.value.content = savedData.value.content;
// postInputData.value.title = savedData.value.title;

const selectImage = (e: Event) => {
  const input = e.target as HTMLInputElement;

  const file = input.files![0];
  if (file) {
    (postInputData.value as BlogPostInputInterface).banner = file;
  }
};

onMounted(() => {
  new MediumEditor("#content-editor");
});

const setcontent = (e: Event) => {
  const data = (e.target as HTMLElement).innerHTML;
  postInputData.value.content = data;
};

watchEffect(() => {
  if (bannerImg.value) {
    addImageFileToImageElem(bannerImg.value, postInputData.value.banner);
  }
});

onMounted(() => {
  if (contentInput.value) {
    contentInput.value.innerHTML = postInputData.value.content;
  }
});
</script>

<template>
  <div class="">
    <form
      @submit.prevent
      class="text-left w-2/3 flex flex-col my-10 mx-auto"
      v-show="connected"
    >
      <input
        id="title"
        v-model="postInputData.title"
        type="text"
        placeholder="Give It A Title"
        class="text-3xl md:text-5xl rounded font-semibold montserrat outline-none border-0 text-left my-6"
      />
      <div class="text-right mb-3">{{ postInputData.title?.length }} /100</div>
      <div class="mb-5 w-full h-60 md:h-96 object-cover flex rounded shadow">
        <div
          v-if="!postInputData.banner"
          class="flex uppercase w-full justify-center items-center bg-teal-500 text-white font-bold text-4xl"
        >
          Select Banner
        </div>
        <img
          class="mb-5 w-full h-60 md:h-96 object-cover rounded"
          ref="bannerImg"
          alt=""
          v-else
        />
      </div>
      <input
        type="file"
        accept="image/*"
        @change="selectImage($event)"
        placeholder="Banner Image ipfs cid"
        class="text-lg title font-semibold montserrat text-left mb-9"
      />

      <div
        ref="contentInput"
        id="content-editor"
        @input="setcontent"
        class="medium-editor-textarea editable prose text-left my-5"
      >
        <p>Craft an awesome blog post here</p>
      </div>
    </form>

    <div v-if="!connected">connected to wallet first</div>
  </div>
</template>

<style scoped lang="scss">
.editable {
  min-height: 20vh;
}

.editable:focus-visible {
  outline: -webkit-focus-ring-color auto 0px;
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  outline-width: 0px;
}

.title:focus-visible {
  outline: -webkit-focus-ring-color auto 0px;
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  outline-width: 0px;
}
</style>
