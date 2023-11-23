<template>
  <div class="container w-[50vw] my-[10vh]">
    <VueDatePicker
      v-model="date"
      input-class-name="dp-custom-input"
      :min-date="new Date()"
    />
  </div>

  <p v-if="date" class="text-center">{{ customDateFormatter(date) }}</p>
  <p v-if="date" class="text-center">{{ customerTime(date) }}</p>
  <p v-if="!date">{{ date }}</p>
</template>

<script setup>
import { ref, computed } from 'vue';

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
</script>
