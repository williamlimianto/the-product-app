<template>
  <header class="header">
    <DSContainer additionalClassName="search-form">
      <form action="#" method="GET" @submit="handleSubmit">
        <input
          autocomplete="off"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          :value="searchInputValue"
          @input="handleSearchInputValueChange"
        />
        <DSButton class="button" type="submit">Search</DSButton>
      </form>
    </DSContainer>
  </header>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import DSButton from '../Button/index.vue';
import DSContainer from '../Container/index.vue';

export default {
  name: 'DSHeader',
  emits: ['submit'],
  components: { DSButton, DSContainer },
  props: {
    searchKeyword: {
      type: String,
      required: true
    }
  },
  setup: (props, ctx) => {
    const searchInputValue = ref('');

    const handleSearchInputValueChange = (e: Event) => {
      const inputElement = e.target as HTMLInputElement;
      const newValue = inputElement.value;

      searchInputValue.value = newValue;
    };

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      ctx.emit('submit', searchInputValue.value);
    };

    watch(
      () => props.searchKeyword,
      (newValue) => {
        searchInputValue.value = newValue || '';
      },
      { immediate: true }
    );

    return { searchInputValue, handleSearchInputValueChange, handleSubmit };
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  background-color: var(--color-dark-1);
  color: #fff;
  padding: 10px 0;
  text-align: center;
  z-index: 100;
}

.search-form form {
  display: flex;
}

.search-form input[type='text'] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 16px;
}

.button {
  border-radius: 0 5px 5px 0;
}
</style>
