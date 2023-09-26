import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ProductItem } from '@lib/types/entities/product';
import { getProductDetail } from '@/lib/api/product';

export const useProductDetailStore = defineStore('product-detail', () => {
  const isLoading = ref(false);
  const detailData = ref<ProductItem | undefined>();

  const fetchDetailData = async (productSlug: string) => {
    isLoading.value = true;
    const newListData = await getProductDetail(productSlug);

    isLoading.value = false;
    detailData.value = newListData;

    return newListData;
  };

  const clearDetailData = () => {
    detailData.value = undefined;
  };

  return { isLoading, detailData, fetchDetailData, clearDetailData };
});
