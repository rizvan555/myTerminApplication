<template>
  <div class="">
    <v-table density="compact" class="">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">E-Mail</th>
          <th class="text-left">Phone</th>
          <th class="text-left">Service</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.username">
          <td class="text-[13px]">{{ user.username }}</td>
          <td class="text-[13px]">{{ user.email }}</td>
          <td class="text-[13px]">{{ user.phone }}</td>
          <td class="text-[13px]">{{ user.selectedService }}</td>
          <td class="text-[13px]">{{ user.date }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { CustomerListProps } from '@/types';
import { ref, onMounted } from 'vue';
import { VTable } from 'vuetify/components';

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
