<template>
  <div class="flex h-screen items-center justify-center">
    <div class="text-center">
      <h3 class="text-xl font-bold mb-6">
        Sind Sie sicher, dass Sie sich abmelden möchten?
      </h3>
      <div class="flex justify-center items-center gap-4">
        <button
          @click="signOut"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ja, abmelden
        </button>
        <button
          @click="toHomePage"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Nein, abbrechen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps([]);

const router = useRouter();

const signOut = () => {
  localStorage.removeItem('token');

  console.log('Signing out...');
  router.push('/');
};

const toHomePage = () => {
  router.push('/');
};
</script>
