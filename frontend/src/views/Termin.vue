<script setup lang="ts">
import type { User } from '@/types';
import { getItem } from '../helper/persistanceStorage';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Service from '../components/Service.vue';

const users = ref<User[]>([]);

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
</script>

<template>
  <main class="flex flex-col justify-center items-center rounded">
    <div class="flex flex-col">
      <h1 class="flex justify-center text-3xl my-7 0 font-bold">
        Unsere Angebote
      </h1>
    </div>
    <!-- <div
      v-if="users.length"
      class="flex justify-center items-center gap-2 mb-6 text-xl"
    >
      <p class="flex justify-center text-xl">Hallo,</p>
      <p v-for="user in users" :key="user.email" class="font-bold">
        {{ user.username }}.
      </p>
      <p>Was möchten Sie tun?</p>
    </div> -->
    <div class="">
      <Service />
    </div>
  </main>
  <hr class="my-6" />
</template>
