import './styles.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@ghentcdh/annotated-text/annotated-text.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

// import { ClickOutside } from '@ghentcdh/ui';
import App from './app/App.vue';
import { loadRuntimeConfig } from '@ghentcdh/tools-vue';
import router from './router';

const app = createApp(App);

// app.directive('click-outside', ClickOutside);

loadRuntimeConfig().then(() => {
  app.use(createPinia());
  app.use(router);
  app.mount('#root');
});
