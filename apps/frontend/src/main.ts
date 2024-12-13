import './styles.scss';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';

import App from './app/App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#root');
