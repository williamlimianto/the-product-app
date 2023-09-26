<template>
  <div :class="['html-renderer', additionalClassName]" v-html="data"></div>
</template>

<script lang="ts">
export default {
  name: 'DSHTMLRenderer',
  props: {
    additionalClassName: {
      type: String
    },
    data: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.html-renderer {
  > :deep(* + *) {
    margin-top: 12px;
  }
}
</style>
