<script setup lang="ts">
import { ref, Ref } from "vue";
import * as MediumEditor from "medium-editor";
import navBar from "../components/editor/navBar.vue";
import { useWallet } from "@solana/wallet-adapter-vue";
import { onMounted, onUnmounted } from "vue";
import useEditor from "../composables/useEditor";
import { BlogPostInputInterface } from "types";

const { connected } = useWallet();
const { error, postData, publishing, status } = useEditor();
const contentInput: Ref<HTMLElement | null> = ref(null);
let contentChange = 0;

const selectImage = (e: Event) => {
  const input = e.target as HTMLInputElement;

  const file = input.files![0];
  if (file) {
    (postData.value as BlogPostInputInterface).banner = file;
  }
};

onMounted(() => {
  new MediumEditor("#content-editor");
  let savedData = localStorage.getItem("savedPost");

  if (savedData) {
    postData.value = JSON.parse(savedData);
    if (contentInput.value?.innerHTML) {
      contentInput.value.innerHTML = (
        postData.value as BlogPostInputInterface
      ).content;
    }
  }
});

const setcontent = (e: Event) => {
  const data = (e.target as HTMLElement).innerHTML;
  (postData.value as BlogPostInputInterface).content = data;
  contentChange += 1;

  if (contentChange > 20) {
    contentChange = 0;

    localStorage.setItem("savedPost", JSON.stringify(postData.value));
  }
};

// setcontent(e) {
//   (this.post.content = e.target.innerHTML), this.contentChange++;
//   if (this.contentChange > 20) {
//     this.contentChange = 0;

//     localStorage.setItem("savedPost", JSON.stringify(this.post));
//   }
// },
// saveInsideComponent(e) {
//   if (!(e.keyCode === 83 && (e.ctrlKey || e.metaKey))) {
//     return;
//   }
//   e.preventDefault();
//   localStorage.setItem("savedPost", JSON.stringify(this.post));
</script>

<template>
  <div class="">
    <navBar> </navBar>

    <form
      @submit.prevent
      class="text-left w-2/3 flex flex-col my-10 mx-auto"
      v-show="connected"
    >
      <label for="title" v-if="postData.title"> Title </label>
      <input
        id="title"
        v-model="postData.title"
        type="text"
        placeholder="Title"
        class="text-3xl rounded font-semibold montserrat outline-none border-0 text-left my-6"
      />
      <div class="text-right mb-3">{{ postData.title?.length }} /100</div>

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
