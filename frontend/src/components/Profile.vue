<template>
  <div class="py-2">
    <div class="my-2">
      <h1 class="font-bold text-2xl text-center">Mein Konto</h1>
    </div>
    <ul v-for="user in users">
      <li class="flex w-[60vw]">
        <p class="font-bold w-[6vw]">Name:</p>
        <p>{{ user.username }}</p>
      </li>
      <li class="flex w-[60vw]">
        <p class="font-bold w-[6vw]">Phone:</p>
        <p>{{ user.phone }}</p>
      </li>
      <li class="flex w-[60vw]">
        <p class="font-bold w-[6vw]">E-Mail:</p>
        <p>{{ user.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getItem } from '../helper/persistanceStorage';
import type { User } from '@/types';
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';

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
