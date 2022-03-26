<script lang="ts" setup>
import { ref, computed } from "vue";
import useEditor from "@/src/composables/useEditor";

import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-vue-ui";
import { useWallet } from "@solana/wallet-adapter-vue";
import { useWorkspace } from "@/src/composables";

const { publishPost, status, publishing, error } = useEditor();
const { connected } = useWallet();
const workspace = useWorkspace();
</script>

<template>
  <nav
    class="flex justify-around items-center px-10 py-5 md:px-15 montserrat"
    v-if="workspace && workspace.program"
  >
    <p class="text-2xl text-black font-bold open-sans">{{ status }}</p>

    <button
      class="btn-primary"
      @click="publishPost(workspace.program.value, workspace.provider.value)"
      v-if="connected"
    >
      <span v-if="publishing"> Publishing ... </span>

      <span v-else> Publish </span>
    </button>
    <div class="px-4">
      <!-- wallet buton -->
      <wallet-modal-provider>
        <wallet-multi-button></wallet-multi-button>
      </wallet-modal-provider>
    </div>
  </nav>
</template>
