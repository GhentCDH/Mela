import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './app/Home.vue';
import AuthorView from './app/views/author/author.vue';
import TextIndexView from './app/views/text-index/text-index.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/text-index',
    name: 'text-index',
    component: TextIndexView,
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
