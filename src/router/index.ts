import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';
import ProductListPage from '@pages/ProductListPage/index.vue';
import ProductDetailPage from '@pages/ProductDetailPage/index.vue';
import ErrorPageNotFound from '@pages/ErrorPage/NotFound/index.vue';

import { ROUTER_NAME } from './constants';
import { PATH_PARAMS } from '@/lib/config';

const BASE_URL = import.meta.env.BASE_URL;
const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory(BASE_URL) : createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTER_NAME.PRODUCT_LIST_PAGE,
      component: ProductListPage
    },
    {
      path: `/product/:${PATH_PARAMS.PRODUCT_DETAIL_PAGE.LANG}/:${PATH_PARAMS.PRODUCT_DETAIL_PAGE.PRODUCT_SLUG}`,
      name: ROUTER_NAME.PRODUCT_DETAIL_PAGE,
      component: ProductDetailPage
    },
    {
      path: '/page-not-found',
      name: ROUTER_NAME.ERROR_PAGE_NOT_FOUND,
      component: ErrorPageNotFound
    }
  ]
});

export default router;
