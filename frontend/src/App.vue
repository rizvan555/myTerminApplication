<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <div class="py-2 px-48 bg-[#f8f6f1] h-full">
    <navigation-bar />
    <label for=""></label>
    <hr />

    <router-view />
  </div>
</template>
