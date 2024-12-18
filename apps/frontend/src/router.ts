import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './app/Home.vue';
import AuthorView from './app/views/author/author.vue';
import TextIndexPhraseFormView from './app/views/text-index/phrase/form.vue';
import TextIndexPhrasesListView from './app/views/text-index/phrase/list.vue';
import TextIndexPhrasesView from './app/views/text-index/phrase/phrase.vue';
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
  {
    path: '/text-index/:textId/phrase',
    name: 'text-index-phrase',
    component: TextIndexPhrasesView,
    children: [
      {
        path: 'new',
        name: 'text-index-phrase-new',
        component: TextIndexPhraseFormView,
      },
      {
        path: ':phraseId',
        name: 'text-index-phrase-edit',
        component: TextIndexPhraseFormView,
      },
      {
        path: 'list',
        name: 'text-index-phrase-list',
        component: TextIndexPhrasesListView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
