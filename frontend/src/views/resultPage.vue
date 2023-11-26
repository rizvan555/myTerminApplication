<template>
  <div>
    <div class="flex justify-center items-center gap-2">
      <h1 class="text-xl">Hallo</h1>
      <Username />
    </div>

    <div>
      <h3>Dein Termin ist am</h3>
      <div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const date = ref<string | null>(null);
const checkTime = ref(true);

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

onMounted(() => {
  const route = useRoute();
  date.value = Array.isArray(route.params.date)
    ? route.params.date[0] // İlk öğeyi alabilirsiniz, ya da diziyi işleyebilirsiniz
    : route.params.date || null;
});
</script>
