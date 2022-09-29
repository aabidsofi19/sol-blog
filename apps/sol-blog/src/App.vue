<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
/* import { getPhantomWallet, getSolflareWallet } from '@solana/wallet-adapter-wallets' */
/* import { WalletProvider } from '@solana/wallet-adapter-vue' */
/* import WorkspaceProvider from './components/workspaceProvider.vue' */

/* var global = window; */
/* const wallets = [ */
/*     getPhantomWallet(), */
/*     getSolflareWallet(), */
/* ] */
import { watchEffect } from "vue"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { initWallet } from "solana-wallets-vue";
import { initWorkspace } from "./composables/useWorkspace";
import { useWorkspace } from "./composables";
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
initWallet({ wallets, autoConnect: true });

initWorkspace();
let workspace = useWorkspace();

watchEffect(() => {
  console.log("Worspace", workspace)
});
</script>

<template>

  <router-view v-if="workspace && workspace.program.value">
  </router-view>
  <div v-else class="overflow-hidden h-screen w-screen">
    <img class="w-full w-full" src="./assets/css-loader-minimal.gif" />
    <p class="text-6xl font-montserrat -m-60 font-bold"> SOL BLOG </p>
  </div>
</template>

<style>

</style>
