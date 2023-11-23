<template>
  <div class="w-[50vw]">
    <div v-for="service in services" :key="service.id">
      <router-link :to="service.path">
        <div
          class="flex justify-center items-center border px-3 py-3 mb-2 rounded bg-slate-100 service-card"
        >
          <div class="w-[40vw]">
            <img
              :src="service.image"
              alt="haarImage"
              class="w-[60px] h-[60px] rounded-full border-slate-500 ]"
            />
          </div>
          <div class="flex flex-col gap-1 ml-4">
            <h3 class="text-[17px] w-[36vw]">{{ service.name }}</h3>
            <p class="text-[12px]">{{ service.price }}</p>
          </div>
          <div class="w-[15vw]">
            <right-arrow />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import RightArrow from '../assets/icons/rightArrow.vue';
import { useServiceStore } from '../stores/serviceStore';

const serviceStore = useServiceStore();
const services = serviceStore.services;
</script>
