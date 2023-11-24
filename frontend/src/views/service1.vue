<template>
  <div class="text-center text-2xl my-4 font-bold">
    <p v-if="selectedServiceName">{{ selectedServiceName }}</p>
  </div>
  <div
    class="flex justify-center items-center container w-[90vw] my-[10vh] gap-5"
  >
    <router-link to="/" class="text-start">
      <left-arrow />
    </router-link>
    <div class="w-[50vw]">
      <VueDatePicker
        v-model="date"
        input-class-name="dp-custom-input"
        :min-date="new Date()"
      />
    </div>
  </div>

  <p v-if="date" class="text-center">{{ customDateFormatter(date) }}</p>
  <p v-if="date" class="text-center">{{ customerTime(date) }}</p>
  <p v-if="!date" class="text-center">{{ startDate }}</p>
</template>

<script setup>
import { ref, computed } from 'vue';
import LeftArrow from '../assets/Icons/LeftArrow.vue';
import { useServiceStore } from '../stores/serviceStore';

const serviceStore = useServiceStore();
const services = serviceStore.services;

const date = ref();
const startDate = ref(new Date());

const customDateFormatter = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const customerTime = (date) => {
  const options = { hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleTimeString('en-GB', options);
};
const selectedServiceName = computed(() => {
  const selectedService = services.find(
    (service) => service.path === '/service1'
  );
  return selectedService ? selectedService.name : '';
});
</script>
