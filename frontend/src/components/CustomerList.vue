<template>
  <div>
    <h1 class="mb-5 font-bold">Customer List</h1>
    <ol>
      <li v-for="user in userList" class="mb-2" type="1">
        <h2><b>Name:</b> {{ user.username }}</h2>
        <p><b>Email:</b> {{ user.email }}</p>
        <p><b>Phone:</b> {{ user.phone }}</p>
        <p><b>Date:</b> {{ user.date }}</p>
        <p><b>Service:</b> {{ user.selectedService }}</p>
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
