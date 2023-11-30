<template>
  <div>
    <ol>
      <li v-for="user in userList" class="mb-2" type="1">
        <h3 class="w-[60vw] flex">
          <p class="font-bold w-[6vw]">Name:</p>
          <p class="w-[30vw]">
            {{ user.username }}
          </p>
        </h3>
        <h3 class="w-[60vw] flex">
          <p class="font-bold w-[6vw]">Email:</p>
          <p>
            {{ user.email }}
          </p>
        </h3>
        <h3 class="w-[60vw] flex">
          <p class="font-bold w-[6vw]">Phone:</p>
          <p>
            {{ user.phone }}
          </p>
        </h3>
        <h3 class="w-[60vw] flex">
          <p class="font-bold w-[6vw]">Date:</p>
          <p>
            {{ user.date }}
          </p>
        </h3>
        <h3 class="w-[60vw] flex">
          <p class="font-bold w-[6vw]">Service:</p>
          <p>{{ user.selectedService }}</p>
        </h3>
        <hr class="w-[60vw] my-2" />
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { CustomerListProps } from '@/types';
import { ref, onMounted } from 'vue';

const userList = ref<CustomerListProps[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5173/api/users/service', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user list');
    }

    const data = await response.json();
    userList.value = data;
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
});
</script>
