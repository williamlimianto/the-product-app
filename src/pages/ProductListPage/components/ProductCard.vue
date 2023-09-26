<template>
  <RouterLink class="link-card" :to="href">
    <DSCard additionalClassName="card" variant="noPadding">
      <article class="inner-container">
        <DSImageWithPlaceholder
          :src="thumbnailSrc"
          :alt="title"
          containerClassName="image-wrapper"
        />

        <div class="content">
          <h3 class="title">{{ title }}</h3>
          <hr class="divider" />
          <DSHTMLRenderer
            additionalClassName="description-wrapper"
            :data="description"
          ></DSHTMLRenderer>
        </div>
      </article>
    </DSCard>
  </RouterLink>
</template>

<script lang="ts">
import DSCard from '@components/DesignSystem/Card/index.vue';
import DSHTMLRenderer from '@components/DesignSystem/HTMLRenderer/index.vue';
import DSImageWithPlaceholder from '@components/DesignSystem/ImageWithPlaceholder/index.vue';

export default {
  name: 'ProductCard',
  components: {
    DSCard,
    DSHTMLRenderer,
    DSImageWithPlaceholder
  },
  props: {
    href: {
      type: String,
      required: true
    },
    thumbnailSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
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
@use '../../../components/DesignSystem/DesignToken/breakpoints.scss' as b;
@use '../../../components/DesignSystem/DesignToken/mixins.scss' as m;

.link-card {
  display: block;
  color: initial;
  text-decoration: none;
}

.inner-container {
  display: flex;
  flex-direction: column;

  @include b.breakpoint(desktop) {
    flex-direction: row;
    height: 135px;
  }
}

:deep(.image-wrapper) {
  flex-shrink: 0;
  width: 100%;
  height: 150px;

  @include b.breakpoint(desktop) {
    width: 300px;
  }
}

.content {
  width: 100%;
  padding: 12px;

  @include b.breakpoint(desktop) {
    padding: 8px 12px;
  }
}

.title {
  @include m.text-truncate(1);
}

.divider {
  margin: 12px 0;

  @include b.breakpoint(desktop) {
    border-color: var(--color-gray-1);
    border-style: dashed;
  }
}

.description-wrapper {
  @include m.text-truncate(4);

  @include b.breakpoint(desktop) {
    @include m.text-truncate(3);
  }
}
</style>
