<template>
  <div
    class="flex flex-col justify-center items-center text-3xl font-bold py-10"
  >
    <h1 class="mb-20">FOTOS UNSERER VERANSTALTUNGEN</h1>

    <div class="grid grid-cols-3 gap-x-10 gap-y-5">
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
      <img :src="profileAvatar" alt="profileAvatar" class="w-72" />
    </div>
  </div>
</template>

<script setup lang="ts">
import profileAvatar from '../assets/images/profileAvatar.png';
</script>
