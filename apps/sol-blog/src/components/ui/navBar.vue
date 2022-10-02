<script setup lang="ts">
import NavDrawer from "ui/BaseNavDrawer.vue";

import {
  useWallet,
  WalletMultiButton,
} from "solana-wallets-vue";
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

const navOpen = ref(false);
</script>

<template>
  <nav
    class="nav font-montserrat text-light bg-secondary flex flex-row justify-around items-center border-b-2 border-black py-8"
  >
    <h1
      class="text-lg md:text-3xl font-bold hover:underline uppercase montserrat"
    >
      <router-link to="/"> Flope </router-link>
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
          <wallet-multi-button></wallet-multi-button>
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
