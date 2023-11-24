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
  <main class="flex flex-col justify-center items-center">
    <div class="flex flex-col">
      <h1 v-if="!users.length" class="flex justify-center text-2xl my-10">
        HomePage
      </h1>
    </div>
    <div
      v-if="users.length"
      class="flex justify-center items-center gap-2 my-4"
    >
      <p class="flex justify-center">Hi,</p>
      <p v-for="user in users" :key="user.email" class="font-bold">
        {{ user.username }}.
      </p>
      <p>What do you want to do?</p>
    </div>
    <div>
      <div class="grid gap-2">
        <Service />
      </div>
    </div>
  </main>
</template>
