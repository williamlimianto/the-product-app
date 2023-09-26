<template>
  <DSContainer class="container">
    <article>
      <h3>Oops... Page not found</h3>
      <p class="description">Please click the button below to go back to homepage.</p>
      <RouterLink to="/">
        <DSButton class="button"> Go back to homepage </DSButton>
      </RouterLink>
    </article>
  </DSContainer>
</template>

<script lang="ts">
import { useHead } from '@unhead/vue';
import { META_TAG_VALUE } from '@/lib/config';
import DSButton from '@components/DesignSystem/Button/index.vue';
import DSContainer from '@components/DesignSystem/Container/index.vue';

export default {
  name: 'ErrorPageNotFound',
  components: {
    DSButton,
    DSContainer
  },
  setup: () => {
    useHead({
      title: META_TAG_VALUE.TITLE
    });
  }
};
</script>

<style scoped>
.container {
  padding-top: 12px;
}

.description,
.button {
  margin-top: 8px;
}
</style>
