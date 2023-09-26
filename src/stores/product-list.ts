import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ProductItem } from '@lib/types/entities/product';
import { getProductList } from '@/lib/api/product';

export const useProductListStore = defineStore('product-list', () => {
  const isLoading = ref(false);
  const listData = ref<ProductItem[]>([]);

  const fetchListData = async (searchKeyword?: string) => {
    isLoading.value = true;
    const newListData = await getProductList({ searchKeyword: searchKeyword || '' });

    isLoading.value = false;
    listData.value = newListData;
  };

  return { isLoading, listData, fetchListData };
});
