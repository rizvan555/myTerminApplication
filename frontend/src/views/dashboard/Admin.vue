<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        v-for="user in users"
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        :title="user.username"
        nav
        @click.stop="rail = !rail"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Home"
          value="home"
          @click="updateValue('home')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="Mein Konto"
          value="account"
          @click="updateValue('account')"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Benutzer"
          value="users"
          @click="updateValue('users')"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div class="">
      <div v-if="value === 'home'" class="py-4">
        <customer-list></customer-list>
      </div>

      <div v-if="value === 'account'">
        <profile></profile>
      </div>

      <div v-if="value === 'users'">Hallo Benutzer</div>
    </div>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  VCard,
  VLayout,
  VNavigationDrawer,
  VList,
  VListItem,
  VDivider,
  VMain,
  VBtn,
} from 'vuetify/components';
import { onMounted } from 'vue';
import { getItem } from '../../helper/persistanceStorage';
import axios from 'axios';
import type { User } from '@/types';
import { useUsersStore } from '../../stores/useAllUsers';
import CustomerList from '../../components/CustomerList.vue';
import Profile from '../../views/Profile.vue';

const drawer = ref(true);
const rail = ref(true);
const users = ref<User[]>([]);
const value = ref('home');
const usersStore = useUsersStore();
const allUsers = usersStore.allUsers;
console.log(allUsers);

const updateValue = (newValue: any) => {
  value.value = newValue;
};

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
</script>
