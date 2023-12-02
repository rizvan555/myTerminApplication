<template>
  <div
    class="flex flex-col pt-2 pb-8 my-10 mx-auto text-center border w-[30vw]"
  >
    <div class="my-2">
      <h1 class="font-bold text-2xl">Mein Konto</h1>
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
const user = ref<User>({
  username: '',
  email: '',
  phone: '',
  services: [],
});

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
      user.value = response.data[0];
    }
  } catch (error) {
    console.error('Error fetching users data:', error);
  }
});
</script>
