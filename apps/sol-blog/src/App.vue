<script setup lang="ts">
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
