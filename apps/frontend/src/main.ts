import './styles.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@ghentcdh/annotated-text/annotated-text.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { ClickOutside } from '@ghentcdh/ui';

import App from './app/App.vue';
import router from './router';

const app = createApp(App);

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
