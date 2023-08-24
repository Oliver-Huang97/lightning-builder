import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from '@/views/ProjectList.vue';
import DesignPage from '@/views/DesignPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectList,
    },
    {
      path: '/design/:id',
      name: 'design',
      component: DesignPage,
      props: (route) => ({ id: route.params.id }),
    },
  ],
});

export default router;
