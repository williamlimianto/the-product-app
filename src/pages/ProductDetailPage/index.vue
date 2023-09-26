<template>
  <DSLoading v-if="isLoadingDetailData" />
  <section v-else>
    <article>
      <div class="main-heading">
        <DSImageWithPlaceholder
          containerClassName="main-image-wrapper"
          :src="detailData?.logoLocation || ''"
          :alt="detailData?.name || ''"
        />

        <div class="overlay"></div>

        <DSContainer additionalClassName="main-caption">
          <h2 class="title">{{ detailData?.name }}</h2>
        </DSContainer>
      </div>

      <DSContainer additionalClassName="main-description">
        <DSHTMLRenderer :data="detailData?.shortDescription || ''"></DSHTMLRenderer>
      </DSContainer>
    </article>

    <article class="seo-article">
      <DSContainer additionalClassName="seo-content">
        <h2>{{ detailData?.productTagline }}</h2>
        <DSHTMLRenderer
          additionalClassName="description-container"
          :data="detailData?.longDescription || ''"
        ></DSHTMLRenderer>
      </DSContainer>
    </article>
  </section>
</template>

<script lang="ts">
import { onBeforeUnmount, onMounted, onServerPrefetch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import DSContainer from '@components/DesignSystem/Container/index.vue';
import DSHTMLRenderer from '@components/DesignSystem/HTMLRenderer/index.vue';
import DSImageWithPlaceholder from '@components/DesignSystem/ImageWithPlaceholder/index.vue';
import DSLoading from '@components/DesignSystem/Loading/index.vue';
import { META_TAG_VALUE, PATH_PARAMS } from '@/lib/config';
import { ROUTER_NAME } from '@/router/constants';
import { useProductDetailStore } from '@/stores/product-detail';

export default {
  name: 'ProductDetailPage',
  components: {
    DSContainer,
    DSHTMLRenderer,
    DSImageWithPlaceholder,
    DSLoading
  },
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    // NOTE: Ideally, you don't have to use State Management for this case.
    //       But since we want to support SSR and only state from Pinia
    //       supporting this, we have to implement this way.
    const productDetailStore = useProductDetailStore();
    const { isLoading: isLoadingDetailData, detailData } = storeToRefs(productDetailStore);

    const fetchAndSetDetailDataState = async () => {
      const productSlug = (
        route.params[PATH_PARAMS.PRODUCT_DETAIL_PAGE.PRODUCT_SLUG] || ''
      ).toString();

      useHead({
        title: META_TAG_VALUE.TITLE
      });

      const responseData = await productDetailStore.fetchDetailData(productSlug);
      if (!responseData) {
        router.replace({
          name: ROUTER_NAME.ERROR_PAGE_NOT_FOUND
        });

        return;
      }

      useHead({
        title: responseData?.productTitle || META_TAG_VALUE.TITLE
      });
    };

    onServerPrefetch(async () => {
      await fetchAndSetDetailDataState();
    });

    onMounted(() => {
      if (!detailData.value) {
        fetchAndSetDetailDataState();
      }
    });

    onBeforeUnmount(() => {
      productDetailStore.clearDetailData();
    });

    return {
      isLoadingDetailData,
      detailData
    };
  }
};
</script>

<style lang="scss" scoped>
.main-heading {
  position: relative;
}

.main-image-wrapper {
  height: 550px;
}

.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 220px;
  z-index: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
}

.main-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 48px;
  z-index: 2;
  color: var(--color-light-1);
}

.main-description {
  padding-top: 24px;
  padding-bottom: 24px;
}

.seo-article {
  background-color: var(--color-secondary-1);
  text-align: center;
  padding: 24px 0;
}

.seo-content {
  color: var(--color-light-1);

  :deep(.description-container) {
    margin-top: 12px;
  }
}
</style>
