<template>
  <DSHeader :searchKeyword="searchKeyword" @submit="handleHeaderFormSubmit" />
  <RouterView />
</template>

<script lang="ts">
import { onMounted, onServerPrefetch, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHead } from 'unhead';
import DSHeader from '@components/DesignSystem/Header/index.vue';
import { META_TAG_VALUE, QUERY_PARAMS } from '@lib/config/index';
import { sanitizeString } from '@lib/helpers/string';
import { ROUTER_NAME } from '@/router/constants';
import { useProductListStore } from '@stores/product-list';

export default {
  name: 'App',
  components: {
    DSHeader
  },
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const productListStore = useProductListStore();
    const { listData } = storeToRefs(productListStore);
    const searchKeyword = ref('');
    const isProductListPage = route.name === ROUTER_NAME.PRODUCT_LIST_PAGE;

    useHead({
      meta: [
        {
          name: 'title',
          content: META_TAG_VALUE.TITLE
        },
        {
          name: 'description',
          content: META_TAG_VALUE.DESCRIPTION
        }
      ]
    });

    // NOTE:
    // - These fetch mechanisms are NOT supposed to be added here.
    //   Since we only have mock JSON as data source and we are not allowed
    //   to alter it, then we have do this to have the data in store / in memory.
    // - These mechanisms will only run on Product Detail and Form Page
    //   related with reason above (we are not allowed to alter the JSON)
    //   Ideally, we should the proper API for storing and fetching
    //   the detail data.
    onServerPrefetch(async () => {
      if (!isProductListPage) {
        await productListStore.fetchListData();
      }
    });

    onMounted(() => {
      if (!isProductListPage && !(listData?.value || []).length) {
        productListStore.fetchListData();
      }
    });

    const handleHeaderFormSubmit = async (newSearchKeyword: string) => {
      const sanitizedCurrentSearchKeyword = sanitizeString(searchKeyword.value);
      const sanitizedNewSearchKeyword = sanitizeString(newSearchKeyword);

      // NOTE: This if statement is added to allow refetch product list data
      //       on Product List page using the same search keyword.
      //       (Since path not changing, no handler that able to handle this case)
      if (isProductListPage && sanitizedCurrentSearchKeyword === sanitizedNewSearchKeyword) {
        await productListStore.fetchListData(newSearchKeyword);
      } else {
        router.push({
          name: ROUTER_NAME.PRODUCT_LIST_PAGE,
          query: {
            [QUERY_PARAMS.HEADER.SEARCH_KEYWORD]: sanitizedNewSearchKeyword
          }
        });
      }
    };

    watch(
      () => route.query[QUERY_PARAMS.HEADER.SEARCH_KEYWORD],
      (newValue) => {
        searchKeyword.value = (newValue || '').toString();
      },
      { immediate: true }
    );

    return { searchKeyword, handleHeaderFormSubmit };
  }
};
</script>

<style lang="scss">
@import url('@components/DesignSystem/DesignToken/main.scss');
</style>

<style lang="scss" scoped></style>
