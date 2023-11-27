import './assets/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import App from './App.vue';
import router from './router';
import { vuetify } from '../src/vuetify';

const app = createApp(App);
app.use(vuetify);

app.use(createPinia());
app.use(router);

app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
