<template>
  <h2>The Product List</h2>

  <div class="product-list-container">
    <template v-for="item in data || []" :key="item.id">
      <ProductCard
        :href="generateProductDetailLink(item.productUrl)"
        :thumbnailSrc="item.logoLocation"
        :title="item.name"
        :description="item.longDescription"
      ></ProductCard>
    </template>
  </div>

  <div v-if="!(data || []).length">
    <article>
      <h3>Data not found</h3>
      <p>Please try again with another search keyword.</p>
    </article>
  </div>
</template>

<script lang="ts">
import { type PropType } from 'vue';
import type { ProductItem } from '@/lib/types/entities/product';
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  props: {
    data: {
      type: Array as PropType<ProductItem[]>,
      required: true
    }
  },
  setup: () => {
    const generateProductDetailLink = (productUrl: string) => {
      // NOTE: Supposed to use full path link here for SEO purposes.
      // return window.location.origin + productUrl;
      return `/product${productUrl}`;
    };

    return {
      generateProductDetailLink
    };
  }
};
</script>

<style lang="scss" scoped>
.product-list-container {
  margin-top: 16px;

  > :deep(* + *) {
    margin-top: 16px;
  }
}
</style>
