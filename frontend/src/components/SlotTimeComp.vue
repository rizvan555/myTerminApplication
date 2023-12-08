<template>
  <div>
    <p v-for="timeSlot in timeSlots" :key="timeSlot.id">
      {{}}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timeSlots = ref([
  {
    id: 1,
    start: '08:00',
    end: '08:30',
    display: '08:00 am - 08:30 am',
    position: true,
  },
  {
    id: 2,
    start: '09:00',
    end: '09:30',
    display: '09:00 am - 09:30 am',
    position: true,
  },
  {
    id: 3,
    start: '10:00',
    end: '10:30',
    display: '10:00 am - 10:30 am',
    position: true,
  },
  {
    id: 4,
    start: '11:00',
    end: '11:30',
    display: '11:00 am - 11:30 am',
    position: true,
  },
  {
    id: 5,
    start: '12:00',
    end: '12:30',
    display: '12:00 am - 12:30 am',
    position: true,
  },
  {
    id: 6,
    start: '13:00',
    end: '13:30',
    display: '13:00 am - 13:30 am',
    position: true,
  },
  {
    id: 7,
    start: '14:00',
    end: '14:30',
    display: '14:00 am - 14:30 am',
    position: true,
  },
  {
    id: 8,
    start: '15:00',
    end: '15:30',
    display: '15:00 am - 15:30 am',
    position: true,
  },
  {
    id: 9,
    start: '16:00',
    end: '16:30',
    display: '16:00 am - 16:30 am',
    position: true,
  },
  {
    id: 10,
    start: '17:00',
    end: '17:30',
    display: '17:00 am - 17:30 am',
    position: true,
  },
  {
    id: 11,
    start: '18:00',
    end: '18:30',
    display: '18:00 am - 18:30 am',
    position: true,
  },
  {
    id: 12,
    start: '19:00',
    end: '19:30',
    display: '19:00 am - 19:30 am',
    position: true,
  },
  {
    id: 13,
    start: '20:00',
    end: '20:30',
    display: '20:00 am - 20:30 am',
    position: true,
  },
]);
const getSelectedSlotTime = (id: number) =>
  timeSlots.value.find((timeSlot) => timeSlot.id === id)?.start;

const selectedSlotTime1 = getSelectedSlotTime(1);
const selectedSlotTime2 = getSelectedSlotTime(2);
const selectedSlotTime3 = getSelectedSlotTime(3);
const selectedSlotTime4 = getSelectedSlotTime(4);
const selectedSlotTime5 = getSelectedSlotTime(5);
const selectedSlotTime6 = getSelectedSlotTime(6);
const selectedSlotTime7 = getSelectedSlotTime(7);
const selectedSlotTime8 = getSelectedSlotTime(8);
const selectedSlotTime9 = getSelectedSlotTime(9);
const selectedSlotTime10 = getSelectedSlotTime(10);
const selectedSlotTime11 = getSelectedSlotTime(11);
const selectedSlotTime12 = getSelectedSlotTime(12);
const selectedSlotTime13 = getSelectedSlotTime(13);
</script>
