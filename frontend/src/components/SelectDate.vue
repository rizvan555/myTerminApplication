<template>
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

  <div class="text-center">
    <button type="submit" @click="handleSubmit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LeftArrow from '../assets/Icons/LeftArrow.vue';
import axios from 'axios';
import { getItem, setItem } from '../helper/persistanceStorage';
import { useRouter } from 'vue-router';
import type { Errors, FormDataServices } from '@/types';

const formDataServices = ref<FormDataServices>({
  date: '',
});

const date = ref<string | null>(null);
const startDate = ref(new Date());
const checkTime = ref(true);
const router = useRouter();
const isSubmitting = ref(false);
const errors = ref<Errors>({});
const userDetails = ref({ username: '', email: '' });

const token = getItem('token');

onMounted(async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };

    const response = await axios.get('/api/users', config);
    userDetails.value = response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
});

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    isSubmitting.value = true;
    formDataServices.value.date = date.value;

    const selectedDate = new Date(formDataServices.value.date);
    selectedDate.setHours(selectedDate.getHours() + 1);

    const response = await axios.post(
      '/api/users/service',
      {
        date: selectedDate.toISOString(),
        email: userDetails.value.email,
        username: userDetails.value.username,
      },
      config
    );

    if (response.data.token) {
      setItem('token', response.data.token);
    }
    router.push({ name: 'result' });
  } catch (error: any) {
    console.log('Server Error:', error.response.data);
  } finally {
    isSubmitting.value = false;
  }
  console.error('Registration Error:', errors);
};

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
  selectedDate.setHours(selectedDate.getHours() + 1);

  const timezoneOffset = selectedDate.getTimezoneOffset() / 60;
  selectedDate.setHours(selectedDate.getHours() + timezoneOffset);

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(8, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(20, 0, 0);

  checkTime.value = selectedDate >= startOfDay && selectedDate <= endOfDay;

  if (checkTime.value) {
    const options = { hour: 'numeric', minute: 'numeric' };
    return selectedDate.toLocaleTimeString(
      'en-GB',
      options as Intl.DateTimeFormatOptions
    );
  } else {
    return 'Please select a valid time range (8:00 - 20:00)';
  }
};
</script>
