import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('./app/Home.vue') },
  {
    path: '/form/:formId',
    name: 'form',
    component: () => import('./app/views/form/form.vue'),
  },
  {
    path: '/text-index',
    name: 'text-index',
    component: () => import('./app/views/text-index/text-index.vue'),
  },
  {
    path: '/text-index/:textId',
    name: 'text-index-view',
    component: () => import('./app/views/text-index/text-view.vue'),
    children: [
      {
        path: '',
        name: 'text-index-annotate',
        component: () => import('./app/views/text-index/text-annotate.vue'),
      },
      {
        path: 'preview',
        name: 'text-index-preview',
        component: () => import('./app/views/text-index/text-preview.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
