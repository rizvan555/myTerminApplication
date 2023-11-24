<template>
  <div v-for="user in users" :key="user.email" class="text-center my-2 text-xl">
    Hallo {{ user.username }}.
    <p class="flex justify-center items-center gap-2">
      Dein wahl ist
      <NameService :serviceId="1" />
    </p>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LeftArrow from '../assets/Icons/LeftArrow.vue';
import NameService from '../components/NameService.vue';
import { useServiceStore } from '../stores/serviceStore';
import { getItem } from '../helper/persistanceStorage';
import axios from 'axios';
import type { User } from '@/types';

const users = ref<User[]>([]);
const date = ref<string | null>(null); // Assuming date is a string, adjust the type if needed
const startDate = ref(new Date());
const checkTime = ref(true);
const serviceStore = useServiceStore();

onMounted(async () => {
  try {
    const token = getItem('token');
    const response = await axios.get('/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data) {
      users.value = [response.data];
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
  }
});

const customDateFormatter = (date: string | null) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date
    ? new Date(date).toLocaleDateString(
        'en-GB',
        options as Intl.DateTimeFormatOptions
      )
    : '';
};

const customerTime = (date: string | null) => {
  if (!date) {
    return '';
  }

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
