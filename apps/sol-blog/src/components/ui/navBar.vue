<script setup lang="ts">
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-vue-ui";
import NavDrawer from "ui/BaseNavDrawer.vue";
import { useWallet } from "@solana/wallet-adapter-vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const wallet = useWallet();
const { connected } = wallet;
const router = useRouter();

const goToMyPosts = () => {
  const userPubKey = wallet.publicKey.value?.toBase58();
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

const navOpen = ref(true);
</script>

<template>
  <nav
    class="nav bg-yellow-400 flex flex-row justify-around items-center border-b-2 border-black py-8"
  >
    <h1
      class="text-lg md:text-3xl font-semibold text-black hover:underline uppercase montserrat"
    >
      <router-link to="/"> Sol Blog </router-link>
    </h1>

    <div class="flex items-center justify-center text-sm md:text-lg">
      <!-- buttons row  -->
      <router-link
        to="/create-post"
        class="montserrat px-2 font-semibold hidden md:block"
      >
        Write
      </router-link>
      <button
        @click="goToMyPosts"
        v-if="connected"
        class="montserrat px-2 font-semibold hidden md:block"
      >
        My Posts
      </button>

      <div class="px-4">
        <!-- wallet buton -->
        <wallet-modal-provider>
          <wallet-multi-button></wallet-multi-button>
        </wallet-modal-provider>
      </div>
    </div>
  </nav>

  <nav-drawer :isOpen="navOpen" @close="navOpen = false">
    <div class="flex flex-col gap-3 w-full text-left">
      <router-link to="/create-post" class="montserrat px-2 font-semibold">
        Write
      </router-link>
      <button
        @click="goToMyPosts"
        v-if="connected"
        class="montserrat px-2 w-fit font-semibold"
      >
        My Posts
      </button>
    </div>
  </nav-drawer>
</template>
