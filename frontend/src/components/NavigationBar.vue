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
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="myMenu in allNavs.menu"
            :key="myMenu.id"
            :value="myMenu.id"
          >
            <v-list-item-title class="flex justify-center items-center gap-2">
              <component :is="myMenu.icon" class="w-[20px]" />
              <a :href="myMenu.path" class="w-[70px]">
                {{ myMenu.name }}</a
              ></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item
            v-for="myMenu in allNavs.menu"
            :key="myMenu.id"
            :value="myMenu.id"
          >
            <v-list-item-title>{{ myMenu.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavbarStore } from '../stores/useNavbar';
import {
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VBtn,
} from 'vuetify/components';

const allNavs = useNavbarStore();
</script>
