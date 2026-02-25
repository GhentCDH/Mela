import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./app/views/work/work-index.vue'),
  },
  {
    path: '/form/:formId',
    name: 'form',
    component: () => import('./app/views/form/form.vue'),
  },
  {
    path: '/work',
    children: [
      {
        path: '',
        name: 'work-index',
        component: () => import('./app/views/work/work-index.vue'),
        // TODO  add texts here
      },
      {
        path: ':workId',
        component: () => import('./app/views/work/work-detail-wrapper.vue'),
        children: [
          {
            path: '',
            name: 'work-detail',
            component: () => import('./app/views/work/work-detail.vue'),
          },
          {
            path: 'section/:sectionId',
            children: [
              {
                path: '',
                name: 'section-detail',
                component: () => import('./app/views/work/section-detail.vue'),
                // TODO  add texts here
              },
              {
                path: 'text-index/:textId',
                name: 'text-index-view',
                children: [
                  {
                    path: '',
                    name: 'text-index-annotate',
                    component: () =>
                      import('./app/views/work/text-index/text-annotate.vue'),
                  },
                  {
                    path: 'preview',
                    name: 'text-index-preview',
                    component: () =>
                      import('./app/views/work/text-index/text-preview.vue'),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
