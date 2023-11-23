<template>
  <div class="w-[50vw]">
    <div
      v-for="service in services"
      :key="service.id"
      class="flex justify-between items-center border px-3 py-2 mb-2 rounded"
    >
      <div class="w-[20vw]">
        <img src="" alt="" />
      </div>
      <div class="flex flex-col">
        <h3 class="text-[17px] w-[30vw]">{{ service.name }}</h3>
        <p class="text-[12px]">{{ service.price }}</p>
      </div>
      <div class="w-[15vw]">{{ service.icon }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '../stores/serviceStore';

const serviceStore = useServiceStore();
const services = serviceStore.services;
</script>
