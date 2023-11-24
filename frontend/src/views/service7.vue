<template>
  <NameService :serviceId="7" />
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
import NameService from '../components/NameService.vue';

const date = ref();
const startDate = ref(new Date());

const customDateFormatter = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const customerTime = (date) => {
  const selectedDate = new Date(date);

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(8, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(20, 0, 0);

  if (selectedDate >= startOfDay && selectedDate <= endOfDay) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return selectedDate.toLocaleTimeString('en-GB', options);
  } else {
    return 'Please select a valid time range (8:00 - 20:00)';
  }
};
</script>
