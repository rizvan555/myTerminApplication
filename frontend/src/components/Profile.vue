<template>
  <div class="pt-2 pb-8 mx-auto flex flex-col w-[100%]">
    <div class="my-2">
      <h1 class="font-bold text-2xl">Mein Konto</h1>
    </div>
    <div class="w-[100px] h-[100px] rounded-full border my-6">
      <img src="{user.image}" alt="userImage" />
      <v-avatar size="73"></v-avatar>
    </div>
    <ul v-for="user in users" class="">
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
import { VAvatar } from 'vuetify/components';

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
