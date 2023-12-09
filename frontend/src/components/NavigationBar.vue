<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <div class="flex items-center justify-center relative">
        <div class="flex items-center justify-center z-20 mr-[-38px]">
          <h1 class="text-2xl font-semibold">B</h1>
          <h1 class="text-xl font-semibold">a</h1>
          <h1 class="text-l font-semibold">r</h1>
        </div>
        <img :src="Barber" alt="razor" class="w-24 z-0" />
        <div class="flex items-center z-20 ml-[-25px]">
          <h1 class="text-2xl font-semibold">B</h1>
          <h1 class="text-xl font-semibold">e</h1>
          <h1 class="text-l font-semibold">r</h1>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-4">
      <button class="font-bold"><a href="/">Home</a></button>

      <div class="flex" v-for="nav in allNavs.navs">
        <a
          href="termin"
          class="px-2 py-1 font-bold active:scale-95 transition-all"
        >
          Termin
        </a>
      </div>

      <button class="font-bold"><a href="galerie">Galerie</a></button>
      <button class="font-bold"><a href="team">Team</a></button>
      <button class="font-bold"><a href="kontakt">Kontakt</a></button>
      <div class="d-flex justify-space-around">
        <v-menu ref="menu">
          <template v-slot:activator="{ props }">
            <button class="font-bold" v-bind="props">Logout</button>
          </template>
          <v-list>
            <v-list-item
              v-for="myMenu in filteredMenu"
              :key="myMenu.id"
              :value="myMenu.id"
            >
              <v-list-item-title class="flex justify-center items-center gap-3">
                <component :is="myMenu.icon" class="w-[20px]" />
                <a :href="myMenu.path" class="w-[70px]">
                  {{ myMenu.name }}</a
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNavbarStore } from '../stores/useNavbar';
import { VMenu, VList, VListItem, VListItemTitle } from 'vuetify/components';
import { getItem } from '../helper/persistanceStorage';
import axios from 'axios';
import { ref } from 'vue';
import type { User } from '@/types';
import { computed } from 'vue';
import Barber from '../assets/logo/Barber.png';

const allNavs = useNavbarStore();
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

const filteredMenu = computed(() => {
  return allNavs.menu.filter((myMenu) => {
    return users.value.length > 0 ? myMenu.isLogged : !myMenu.isLogged;
  });
});
</script>
