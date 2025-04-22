import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  { path: '/', name: 'home', redirect: '/book' },
  {
    path: '/form/:formId',
    name: 'form',
    component: () => import('./app/views/form/form.vue'),
  },
  {
    path: '/book',
    children: [
      {
        path: '',
        name: 'book-index',
        component: () => import('./app/views/book/book-index.vue'),
        // TODO  add texts here
      },
      {
        path: ':bookId',
        component: () => import('./app/views/book/book-detail-wrapper.vue'),
        children: [
          {
            path: '',
            name: 'book-detail',
            component: () => import('./app/views/book/book-detail.vue'),
          },
          {
            path: 'chapter/:chapterId',
            children: [
              {
                path: '',
                name: 'chapter-detail',
                component: () => import('./app/views/book/chapter-detail.vue'),
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
                      import('./app/views/book/text-index/text-annotate.vue'),
                  },
                  {
                    path: 'preview',
                    name: 'text-index-preview',
                    component: () =>
                      import('./app/views/book/text-index/text-preview.vue'),
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
