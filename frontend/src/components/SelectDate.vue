<template>
  <div
    v-if="!showSuccessMessage"
    class="flex justify-center items-center container my-[4vh] gap-5"
  >
    <div class="w-[50vw]">
      <VueDatePicker
        v-model="date"
        input-class-name="dp-custom-input"
        :min-date="new Date()"
        :disabled="userDetails.username === ''"
        :disabled-week-days="[0]"
      />
    </div>
  </div>
  <div
    class="flex flex-col justify-center items-center"
    v-if="userDetails.username === ''"
  >
    <img :src="AttentionIcon" alt="AttentionIcon" class="w-16" />
    <h1 class="text-red-500 text-center text-xl mb-4">
      Sie müssen sich anmelden
    </h1>
  </div>
  <div
    class="flex flex-col justify-center items-center gap-4"
    v-if="!showSuccessMessage"
  >
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

  <div
    class="flex justify-center items-center w-[30vw] mx-auto my-[10vh]"
    v-if="showSuccessMessage"
  >
    <div class="flex flex-col justify-center items-center py-4">
      <div class="mb-5 font-bold text-xl">
        <h1>Ihr Termin</h1>
        <hr />
      </div>

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
  </div>

  <div
    class="mx-auto bn39 mt-8"
    v-if="!showSuccessMessage && userDetails.username"
  >
    <button
      type="submit"
      @click="handleSubmit"
      v-if="!showSuccessMessage && userDetails.username"
      :disabled="!date || isSubmitting"
      class="bn39span"
    >
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import axios from 'axios';
import { getItem, setItem } from '../helper/persistanceStorage';
import { useRouter } from 'vue-router';
import type { Errors, FormDataServices } from '@/types';
import AttentionIcon from '../assets/Icons/icons8-attention.gif';

const formDataServices = ref<FormDataServices>({
  date: '',
});

const date = ref<string | null>(null);
const startDate = ref(new Date());
const checkTime = ref(true);
const router = useRouter();
const isSubmitting = ref(false);
const showSuccessMessage = inject('showSuccessMessage', ref(false));
const errors = ref<Errors>({});
const userDetails = inject('userDetails', ref({ username: '', email: '' }));

const token = getItem('token');

onMounted(async () => {
  try {
    const token = getItem('token');

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.get('/api/users', config);
      userDetails.value = response.data;
    }
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

    const selectedDate = new Date(String(formDataServices.value.date));
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
    showSuccessMessage.value = true;
    console.log('Success:', response.data);
  } catch (error: any) {
    console.log('Server Error:', error.response.data);
  } finally {
    isSubmitting.value = false;
  }
  console.error('Registration Error:', errors.value);
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
