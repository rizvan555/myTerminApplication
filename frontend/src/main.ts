import './assets/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
