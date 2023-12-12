<template>
  <div
    class="flex flex-col pt-2 pb-8 my-28 mx-auto text-center border w-[40vw] h-[40vh] contact"
  >
    <div class="my-2">
      <h1 class="font-bold text-2xl">Mein Konto</h1>
    </div>

    <ul
      v-for="user in users"
      class="flex flex-col justify-center items-start text-center mx-auto leading-8 gap-2"
    >
      <li class="flex gap-2 items-start justify-start w-[35vw]">
        <p class="font-bold w-[8vw]">Name:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.name">{{ user.username }}</p>
          <form v-if="updatedInfo.name" class="border rounded">
            <input
              type="text"
              placeholder="Name"
              class="pl-3 w-[20vw]"
              name="name"
            />
          </form>
          <button
            type="button"
            @click="() => toggleUpdatedInfo('name')"
            v-if="!updatedInfo.name"
          >
            <PenIcon />
          </button>
        </div>

        <div class="">
          <button
            type="button"
            v-if="updatedInfo.name"
            @click="reloadButton"
            class="flex justify-center items-center w-[30px] h-[30px] rounded-full border"
          >
            X
          </button>
        </div>
      </li>

      <li class="flex gap-2 items-start justify-start w-[35vw]">
        <p class="font-bold w-[8vw]">Phone:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.phone">{{ user.phone }}</p>
          <form v-if="updatedInfo.phone" class="border rounded">
            <input
              type="number"
              placeholder="Phone"
              class="pl-3 w-[20vw]"
              name="phone"
            />
          </form>
          <button
            type="button"
            @click="() => toggleUpdatedInfo('phone')"
            v-if="!updatedInfo.phone"
          >
            <PenIcon />
          </button>
        </div>
        <div class="">
          <button
            type="button"
            v-if="updatedInfo.phone"
            @click="reloadButton"
            class="flex justify-center items-center w-[30px] h-[30px] rounded-full border"
          >
            X
          </button>
        </div>
      </li>

      <li class="flex gap-2 items-start justify-start w-[35vw]">
        <p class="font-bold w-[8vw]">Email:</p>
        <div class="flex items-center justify-between w-[25vw] gap-10">
          <p v-if="!updatedInfo.email">{{ user.email }}</p>
          <form v-if="updatedInfo.email" class="border rounded">
            <input
              type="text"
              placeholder="E-Mail"
              class="pl-3 w-[20vw]"
              name="email"
            />
          </form>
          <button
            type="button"
            @click="() => toggleUpdatedInfo('email')"
            v-if="!updatedInfo.email"
          >
            <PenIcon />
          </button>
        </div>

        <div class="">
          <button
            type="button"
            v-if="updatedInfo.email"
            @click="reloadButton"
            class="flex justify-center items-center w-[30px] h-[30px] rounded-full border"
          >
            X
          </button>
        </div>
      </li>
      <button
        type="button"
        v-if="updatedInfo.phone || updatedInfo.name || updatedInfo.email"
        class="border px-4 mt-6 rounded bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white form-bold"
        @click="acceptInfo"
      >
        Akzeptieren
      </button>
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

const acceptInfo = (e: Event) => {
  e.preventDefault();

  const nameInput = document.querySelector('input[name="name"]');
  if (nameInput) {
    const nameInput = document.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const updatedUsername = nameInput.value;
    console.log(updatedUsername);
  }

  const phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    const phoneInput = document.querySelector(
      'input[name="phone"]'
    ) as HTMLInputElement;
    const updatePhone = phoneInput.value;
    console.log(updatePhone);
  }

  const emailInput = document.querySelector('input[name="email"]');
  if (emailInput) {
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const updatedEmail = emailInput.value;
    console.log(updatedEmail);
  }
};
const reloadButton = () => {
  updatedInfo.value.name = false;
  updatedInfo.value.phone = false;
  updatedInfo.value.email = false;
};
</script>
