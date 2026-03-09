import './styles.scss';
import '@ghentcdh/annotated-text/annotated-text.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

// import { ClickOutside } from '@ghentcdh/ui';
import App from './app/App.vue';
import { loadRuntimeConfig } from '@ghentcdh/tools-vue';
import router from './router';
import { useAnnotationDefStore } from './app/views/work/annotation/store/annotation-def.store';

const app = createApp(App);

// app.directive('click-outside', ClickOutside);

loadRuntimeConfig().then(() => {
  app.use(createPinia());

  const initialLoads = Promise.all([useAnnotationDefStore().init()]);
  initialLoads.then(() => {
    app.use(router);
    app.mount('#root');
  });
});
