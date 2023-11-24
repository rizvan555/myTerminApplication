<template>
  <NameService :serviceId="1" />
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

  <div class="flex flex-col justify-center items-center gap-4">
    <div v-if="date" class="flex gap-2 text-xl">
      {{ customDateFormatter(date) }}
    </div>

    <div
      v-if="date"
      class="text-center text-2xl flex gap-2"
      :class="{
        'text-red-600': !checkTime,
      }"
    >
      {{ customerTime(date) }}
    </div>
  </div>
  <p v-if="!date" class="text-center">{{ startDate }}</p>
</template>

<script setup>
import { ref } from 'vue';
import LeftArrow from '../assets/Icons/LeftArrow.vue';
import NameService from '../components/NameService.vue';

const date = ref();
const startDate = ref(new Date());
const checkTime = ref(true); // Initialize checkTime with a default value

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

  checkTime.value = selectedDate >= startOfDay && selectedDate <= endOfDay;

  if (checkTime.value) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return selectedDate.toLocaleTimeString('en-GB', options);
  } else {
    return 'Please select a valid time range (8:00 - 20:00)';
  }
};
</script>
