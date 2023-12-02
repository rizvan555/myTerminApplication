<template>
  <div class="flex justify-center items-center gap-4">
    <div class="flex" v-for="nav in allNavs.navs">
      <a
        :href="nav.path"
        class="bg-red-500 px-2 py-1 font-bold text-white active:scale-95 transition-all"
      >
        {{ nav.name }}
      </a>
    </div>

    <div class="d-flex justify-space-around">
      <v-menu ref="menu">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            <v-icon>menu</v-icon>
          </v-btn>
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
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNavbarStore } from '../stores/useNavbar';
import {
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VBtn,
} from 'vuetify/components';
import { getItem } from '../helper/persistanceStorage';
import axios from 'axios';
import { ref } from 'vue';
import type { User } from '@/types';
import { computed } from 'vue';

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
