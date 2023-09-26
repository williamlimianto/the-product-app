<template>
  <div :class="['card', additionalClassName]">
    <div
      :class="{
        'card-content': true,
        'no-padding': isVariantNoPadding
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

type PaddingVariant = 'default' | 'noPadding';

export default {
  name: 'DSCard',
  props: {
    variant: {
      type: String as PropType<PaddingVariant>,
      default: 'default'
    },
    additionalClassName: {
      type: String
    }
  },
  setup: (props) => {
    const isVariantNoPadding = props.variant === 'noPadding';

    return {
      isVariantNoPadding
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-content {
  padding: 16px;

  &.no-padding {
    padding: 0;
  }
}
</style>
