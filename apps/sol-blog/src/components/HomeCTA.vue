<template>
  <div class="bg-green-100 class flex flex-col items-center py-32 gap-10">
    <h3
      class="text-6xl font-heading w-1/2 font-semibold text-green-600 text-center"
    >
      Start publishing on web3 in seconds.
    </h3>
    <router-link
      :to="{ name: 'create-post' }"
      class="rounded-xl text-xl bg-green-600 shadow-sm text-white px-10 py-4"
    >
      Lets Go
    </router-link>
  </div>
</template>
