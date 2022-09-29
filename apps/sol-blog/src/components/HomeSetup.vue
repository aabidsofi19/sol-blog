<script setup lang="ts" >

const features = [
  {
    heading : "World-class contracts",
    content : "Burn less gas. Mirror contracts are beyond optimized."
  },
{
    heading : "Login with your wallet",
    content : "No signup. Your identity and content is portable across all of web3."
  },

{
    heading : "World-class contracts",
    content : "Everything you publish is stored on the permaweb with Arweave."
  },



]

</script>

<template>
  <div class="bg-stone-100 pb-6">
    <div class="bg-stone-100 mx-auto w-full max-w-7xl">
      <h3 class="font-semibold text-2xl text-black">
        Powerful tool. Simple setup.<span class="px-2 text-gray-500"
          >Simply connect your wallet to start publishing.</span
        >
      </h3>

      <div class="flex gap-4 items-center py-4">
        <div class="bg-white p-4 rounded-lg shadow-sm" v-for="item in features">
          <p class="text-green-500 font-semibold py-2">{{item.heading}}</p>
          <p class="text-gray-500">
          {{item.content}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
