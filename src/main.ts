import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';

import App from './App.vue';
import router from '@router/index';

export const createApp: () => any = () => {
  const app = createSSRApp(App);
  const store = createPinia();
  const head = createHead();

  app.use(head);
  app.use(store);
  app.use(router);

  return { app, store, router, head };
};
