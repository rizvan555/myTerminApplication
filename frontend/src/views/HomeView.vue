<script setup lang="ts">
import type { User } from '@/types';
import { getItem } from '../helper/persistanceStorage';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const users = ref<User[]>([]);

onMounted(async () => {
  try {
    const token = getItem('token'); // Get the token from local storage
    const response = await axios.get('/api/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (response && response.data) {
      users.value = [response.data]; // Wrap the user data in an array for consistency
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
  }
});
</script>

<template>
  <main>
    <div class="flex flex-col">
      <h1 v-if="!users.length" class="flex justify-center text-2xl my-10">
        HomePage
      </h1>
    </div>
    <div v-if="users.length">
      <p class="flex justify-center" v-for="user in users" :key="user.email">
        Hi, {{ user.username }}
      </p>
    </div>
  </main>
</template>
