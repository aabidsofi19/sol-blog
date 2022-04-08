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

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { initWallet } from "solana-wallets-vue";
import { initWorkspace } from "./composables/useWorkspace";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
initWallet({ wallets, autoConnect: true });
initWorkspace();
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
