<script setup lang="ts">
//ui components
import NavBar from "../components/ui/navBar.vue";
import Header1 from "../components/ui/header.vue";
import Features from "../components/HomeFeatures.vue"
import Setup from "../components/HomeSetup.vue"
import Highlights from "../components/HomeHiglights.vue"
import Cta from "../components/HomeCTA.vue"
</script>

<template>

  <div>
    <nav-bar></nav-bar>
    <header1></header1>
    <features> </features>
    <setup></setup>
    <highlights></highlights>
    <cta></cta>
  </div>
</template>


<style scoped>
a {
  color: #42b983;
}
</style>
