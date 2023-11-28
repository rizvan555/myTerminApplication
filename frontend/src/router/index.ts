import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUp from '../views/SignUp.vue';
import SignIn from '../views/SignIn.vue';
import Service1 from '../views/service1.vue';
import Service2 from '../views/service2.vue';
import Service3 from '../views/service3.vue';
import Service4 from '../views/service4.vue';
import Service5 from '../views/service5.vue';
import Service6 from '../views/service6.vue';
import Service7 from '../views/service7.vue';
import Service8 from '../views/service8.vue';
import Service9 from '../views/service9.vue';
import Admin from '../views/dashboard/Admin.vue';
import { getItem } from '../helper/persistanceStorage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp,
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/service1',
      name: 'service1',
      component: Service1,
    },
    {
      path: '/service2',
      name: 'service2',
      component: Service2,
    },
    {
      path: '/service3',
      name: 'service3',
      component: Service3,
    },
    {
      path: '/service4',
      name: 'service4',
      component: Service4,
    },
    {
      path: '/service5',
      name: 'service5',
      component: Service5,
    },
    {
      path: '/service6',
      name: 'service6',
      component: Service6,
    },
    {
      path: '/service7',
      name: 'service7',
      component: Service7,
    },
    {
      path: '/service8',
      name: 'service8',
      component: Service8,
    },
    {
      path: '/service9',
      name: 'service9',
      component: Service9,
    },
    {
      path: '/dashboard/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = getItem('token');

    if (!token) {
      next({ name: 'signIn' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
