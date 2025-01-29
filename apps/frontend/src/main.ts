import './styles.scss';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { ClickOutside } from '@ghentcdh/ui';

import App from './app/App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('click-outside', ClickOutside);

app.mount('#root');
