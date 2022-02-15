<template>
  <button class="my-button">
    <slot v-if="$slots.loading" name="loading" class="my-button-loading"></slot>
    <MyLoading v-else class="my-button-loading"></MyLoading>
    <div class="my-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'MyButtonX',
  props: {
    loading: {
      type: Boolean,
      default: null,
    },
  },
  components: {},
})
export default class MyButton extends Vue {
  // private renderLoading() {}
}
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';

.my-button {
  @include flex-row(center);
}
</style>
