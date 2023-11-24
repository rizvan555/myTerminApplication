<template>
  <div class="">
    <div class="flex justify-center items-center gap-2">
      <p class="text-xl">Hallo</p>
      <p><user-name /></p>
    </div>
    <div class="flex justify-center items-center gap-2">
      <p class="text-xl">Dein wahl ist</p>
      <NameService :serviceId="1" />
    </div>
  </div>

  <select-date />
</template>

<script setup lang="ts">
import NameService from '../components/NameService.vue';
import SelectDate from '../components/SelectDate.vue';
import UserName from '../components/Username.vue';
</script>
