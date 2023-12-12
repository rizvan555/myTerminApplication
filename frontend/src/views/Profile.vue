<template>
  <div
    class="flex flex-col pt-2 pb-8 my-28 mx-auto text-center border w-[40vw] contact"
  >
    <div class="my-2">
      <h1 class="font-bold text-2xl">Mein Konto</h1>
    </div>

    <ul
      v-for="user in users"
      class="flex flex-col justify-center items-start text-center mx-auto leading-8 gap-2"
    >
      <li class="flex gap-2 items-start justify-start">
        <p class="font-bold w-[8vw]">Name:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.name">{{ user.username }}</p>
          <div v-if="updatedInfo.name" class="border">
            <input
              type="text"
              placeholder="Name"
              class="pl-3 w-[20vw]"
              name="name"
            />
          </div>
          <button type="button" @click="() => toggleUpdatedInfo('name')">
            <PenIcon />
          </button>
        </div>
      </li>
      <li class="flex gap-2 items-start justify-start">
        <p class="font-bold w-[8vw]">Phone:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.phone">{{ user.phone }}</p>
          <div v-if="updatedInfo.phone" class="border">
            <input
              type="text"
              placeholder="Phone"
              class="pl-3 w-[20vw]"
              name="phone"
            />
          </div>
          <button type="button" @click="() => toggleUpdatedInfo('phone')">
            <PenIcon />
          </button>
        </div>
      </li>
      <li class="flex gap-2 items-start justify-start">
        <p class="font-bold w-[8vw]">Email:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.email">{{ user.email }}</p>
          <div v-if="updatedInfo.email" class="border">
            <input
              type="text"
              placeholder="E-Mail"
              class="pl-3 w-[20vw]"
              name="email"
            />
          </div>
          <button type="button" @click="() => toggleUpdatedInfo('email')">
            <PenIcon />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getItem } from '../helper/persistanceStorage';
import type { UpdatedInfo, User } from '@/types';
import axios from 'axios';
import { ref } from 'vue';
import { onMounted } from 'vue';
import PenIcon from '../assets/Icons/PenIcon.vue';

const users = ref<User[]>([]);
const user = ref<User>({
  username: '',
  email: '',
  phone: '',
  services: [],
});
const updatedInfo = ref<UpdatedInfo>({
  name: false,
  phone: false,
  email: false,
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

const toggleUpdatedInfo = (propertyName: keyof UpdatedInfo) => {
  updatedInfo.value[propertyName] = !updatedInfo.value[propertyName];
};
</script>
