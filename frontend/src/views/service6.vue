<template>
  <div class="">
    <div
      class="flex justify-center items-center gap-2"
      v-if="!showSuccessMessage"
    >
      <p class="text-xl">Hallo</p>
      <p><user-name /></p>
    </div>
    <div
      class="flex justify-center items-center gap-2"
      v-if="!showSuccessMessage"
    >
      <p class="text-xl">Ihre Wahl ist</p>
      <NameService :serviceId="6" />
    </div>
  </div>

  <select-date :showSuccessMessage="showSuccessMessage"/>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import NameService from '../components/NameService.vue';
import SelectDate from '../components/SelectDate.vue';
import UserName from '../components/Username.vue';

const showSuccessMessage = ref(false);
provide('showSuccessMessage', showSuccessMessage);
</script>
