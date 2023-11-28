<template>
  <div>{{ allUsers }}</div>
</template>

<script setup lang="ts">
import { useUsersStore } from '../stores/useAllUsers';

const allUsers = useUsersStore().allUsers;
console.log(allUsers);
</script>
