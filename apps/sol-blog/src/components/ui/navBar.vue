<script setup lang="ts">
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-vue-ui";
</script>

<template>
  <div
    class="nav bg-yellow-500 flex flex-row justify-around items-center border-b-2 border-black py-8"
  >
    <h1
      class="text-xl md:text-3xl font-semibold text-black hover:underline uppercase montserrat"
    >
      <router-link to="/"> Sol Blog </router-link>
    </h1>

    <div class="flex items-center justify-center text-sm md:text-lg">
      <!-- buttons row  -->
      <router-link to="/editor" class="montserrat px-2 font-semibold">
        Write
      </router-link>
      <router-link to="/myposts" class="montserrat px-2 font-semibold">
        My Posts
      </router-link>
      <a href="" class="montserrat px-2 font-semibold"> Faqs </a>

      <div class="px-4">
        <!-- wallet buton -->
        <wallet-modal-provider>
          <wallet-multi-button></wallet-multi-button>
        </wallet-modal-provider>
      </div>
    </div>
  </div>
</template>
