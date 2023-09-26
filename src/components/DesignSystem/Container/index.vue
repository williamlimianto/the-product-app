<template>
  <div :class="['container', additionalClassName]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DSContainer',
  props: {
    additionalClassName: String
  }
};
</script>

<style lang="scss" scoped>
@use '..//DesignToken/breakpoints.scss' as b;

.container {
  width: 100%;
  max-width: calc(1200px - (2 * var(--edge-padding)));
  margin: 0 auto;
  padding-left: var(--edge-padding);
  padding-right: var(--edge-padding);
}
</style>
