import './styles.scss';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { ClickOutside } from '@ghentcdh/ui';

import App from './app/App.vue';
import router from './router';

const app = createApp(App);

const windowVariables = window['_env_'];
console.log(windowVariables);

app.use(createPinia());
app.use(router);

// app.use(
//   createAuth({
//     keycloak: {
//       realm: import.meta.env.VITE_KEYCLOAK_REALM,
//       url: import.meta.env.VITE_KEYCLOAK_HOST,
//       clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
//     },
//   }),
// );
app.directive('click-outside', ClickOutside);

app.mount('#root');
