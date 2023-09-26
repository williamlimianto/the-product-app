<template>
  <button :type="type" class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue';

type ButtonType = 'button' | 'reset' | 'submit';

export default {
  name: 'DSButton',
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: 'button'
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 20px;
  background-color: var(--color-primary-1);
  transition: background-color 0.3s ease;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}

.button:hover,
.button:focus {
  background-color: var(--color-secondary-1);
}

.button:active {
  background-color: var(--color-primary-2);
}
</style>
