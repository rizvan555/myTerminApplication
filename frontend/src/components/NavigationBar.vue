<template>
  <div class="flex items-center justify-between gap-2 px-10 py-3 bg-slate-100">
    <div class="flex items-center gap-[35vw]">
      <div class="flex items-center">
        <div class="flex flex-col items-center justify-center relative">
          <img :src="Razor" alt="razor" class="w-5 z-0" />
          <div class="flex items-center z-20 font-serif">
            <h1 class="text-l font-semibold">BarBer</h1>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-[3vw]">
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
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1">
        <h1>Hi,</h1>
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
              <Dots v-else />
            </button>
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
import Razor from '../assets/logo/Razor.png';
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
