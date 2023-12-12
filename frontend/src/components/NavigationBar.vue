<template>
  <div class="flex items-center justify-between gap-4 px-10 py-3 bg-indigo-950">
    <div class="flex items-center gap-[35vw]">
      <div class="flex items-center">
        <div class="flex flex-col items-center justify-center relative">
          <!-- <img :src="Barber" alt="razor" class="w-20 z-0" /> -->
          <div class="flex items-center z-20 font-serif">
            <h1 class="text-xl font-semibold text-white">BarBer</h1>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-[3vw]">
        <button class="font-bold nav-buttons"><a href="/">Home</a></button>
        <button class="font-bold nav-buttons">
          <a href="/about">About</a>
        </button>

        <div class="flex" v-for="nav in allNavs.navs">
          <a
            href="termin"
            class="px-2 py-1 font-bold active:scale-95 transition-all nav-buttons"
          >
            Termin
          </a>
        </div>

        <button class="font-bold nav-buttons"><a href="team">Team</a></button>
        <button class="font-bold nav-buttons">
          <a href="galerie">Galerie</a>
        </button>
        <button class="font-bold nav-buttons">
          <a href="kontakt">Kontakt</a>
        </button>
      </div>
    </div>

    <div class="flex items-center gap-3 text-white">
      <div class="flex items-center gap-1">
        <h1 v-if="users && users.length > 0">Hi,</h1>
        <Username />
      </div>
      <div class="d-flex justify-space-around">
        <v-menu ref="menu">
          <template v-slot:activator="{ props }">
            <button
              class="border rounded-full w-[36px] h-[36px] flex justify-center items-center logout-button bg-[#e5e5e5]"
              v-bind="props"
            >
              <AvatarLetter v-if="users && users.length > 0" />
              <Dots v-else class="text-black" />
            </button>
          </template>
          <v-list>
            <v-list-item
              v-for="myMenu in filteredMenu"
              :key="myMenu.id"
              :value="myMenu.id"
            >
              <v-list-item-title class="flex justify-center items-center gap-3">
                <component :is="myMenu.icon" class="w-[20px] h-[25px]" />
                <a :href="myMenu.path" class="w-[70px] font-semibold">
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
import Username from './Username.vue';
import AvatarLetter from './AvatarLetter.vue';
import Dots from '../assets/Icons/Dots.vue';

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
