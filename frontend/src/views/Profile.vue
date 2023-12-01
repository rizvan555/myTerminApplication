<template>
  <div
    class="flex flex-col pt-2 pb-8 my-10 mx-auto text-center border w-[30vw]"
  >
    <div class="my-2">
      <h1 class="font-bold text-2xl">Mein Konto</h1>
    </div>
    <div class="w-[100px] h-[100px] rounded-full border my-6 mx-auto">
      <img src="{user.image}" alt="userImage" />
      <v-avatar size="73"></v-avatar>
    </div>
    <div class="my-4">
      <input type="file" ref="fileInput" style="display: none" />
      <v-btn color="primary">
        <v-icon>image</v-icon>
      </v-btn>
    </div>
    <ul
      v-for="user in users"
      class="flex flex-col justify-center items-start text-center mx-auto leading-8"
    >
      <li class="flex">
        <p class="font-bold w-[6vw]">Name:</p>
        <p>{{ user.username }}</p>
      </li>
      <li class="flex">
        <p class="font-bold w-[6vw]">Phone:</p>
        <p>{{ user.phone }}</p>
      </li>
      <li class="flex">
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
import { VAvatar, VBtn } from 'vuetify/components';

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
