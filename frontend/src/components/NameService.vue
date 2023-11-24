<template>
  <div class="text-center text-2xl my-4 font-bold">
    <p v-if="selectedServiceName">{{ selectedServiceName }}</p>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from '../stores/serviceStore';
import { computed } from 'vue';

const serviceStore = useServiceStore();
const services = serviceStore.services;
const props = defineProps(['serviceId']);

const selectedServiceName = computed(() => {
  const selectedService = services.find(
    (service) => service.id === props.serviceId
  );
  return selectedService ? selectedService.name : '';
});
</script>
