<template>
  <div :class="['image-wrapper', containerClassName]">
    <img :class="['image', imageClassName]" :src="src" :alt="alt" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export default {
  name: 'DSImageWithPlaceholder',
  props: {
    containerClassName: {
      type: String
    },
    imageClassName: {
      type: String
    },
    src: {
      type: String as PropType<string>,
      required: true
    },
    alt: {
      type: String as PropType<string>,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  background-image: url('./placeholder.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
