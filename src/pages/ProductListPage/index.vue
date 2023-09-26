<template>
  <section>
    <DSContainer class="container">
      <DSLoading v-if="isLoadingListData" />
      <ProductList v-else :data="listData || []"></ProductList>
    </DSContainer>
  </section>
</template>

<script lang="ts">
import { onMounted, onServerPrefetch, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import DSContainer from '@components/DesignSystem/Container/index.vue';
import DSLoading from '@components/DesignSystem/Loading/index.vue';
import { META_TAG_VALUE, QUERY_PARAMS } from '@lib/config';
import { useProductListStore } from '@stores/product-list';
import ProductList from './components/ProductList.vue';

export default {
  name: 'ProductListPage',
  components: {
    DSContainer,
    DSLoading,
    ProductList
  },
  setup: () => {
    const route = useRoute();
    const productListStore = useProductListStore();
    const { isLoading: isLoadingListData, listData } = storeToRefs(productListStore);

    useHead({
      title: META_TAG_VALUE.TITLE
    });

    const fetchListData = async () => {
      const searchKeyword = (route.query[QUERY_PARAMS.HEADER.SEARCH_KEYWORD] || '').toString();
      await productListStore.fetchListData(searchKeyword);
    };

    onServerPrefetch(async () => {
      await fetchListData();
    });

    onMounted(() => {
      fetchListData();
    });

    watch(
      () => route.query[QUERY_PARAMS.HEADER.SEARCH_KEYWORD],
      async (newValue) => {
        await productListStore.fetchListData((newValue || '').toString());
      }
    );

    return {
      isLoadingListData,
      listData
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 12px;
  padding-bottom: 40px;
}
</style>
