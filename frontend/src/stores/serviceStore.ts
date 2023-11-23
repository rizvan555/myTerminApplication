import type { Service } from '@/types';
import { defineStore } from 'pinia';

interface ServiceState {
  services: Service[];
}

export const useServiceStore = defineStore('serviceStore', {
  state: (): ServiceState => ({
    services: [
      {
        id: 1,
        image: 'image',
        name: 'Trocken schneiden & Styling / Cutting & Styling',
        price: '€ 20.00',
        icon: 'icon',
        path: '/service1',
      },
      {
        id: 2,
        image: 'image',
        name: 'Basis Paket / Basic Package',
        price: '€ 15.00',
        icon: 'icon',
        path: '/service2',
      },
      {
        id: 3,
        image: 'image',
        name: 'Kinderhaarschnitt / Children Haircut',
        price: '€ 10.00',
        icon: 'icon',
        path: '/service3',
      },
    ],
  }),
  getters: {},

  actions: {},
});
