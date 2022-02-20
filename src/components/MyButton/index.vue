<template>
  <button
    :class="['my-button', `my-button--${type}`, `my-button--${disabled}`]"
    :disabled="disabled"
    @click.stop="onClick"
  >
    <template v-if="loading">
      <slot
        v-if="$slots.loading"
        name="loading"
        class="my-button-loading"
      ></slot>
      <MyLoading v-else class="my-button-loading"></MyLoading>
    </template>

    <div class="my-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'MyButton',
  inheritAttrs: true,
  /* 注: 未声明时, 与原生事件同名时, 会触发2次 */
  emits: ['click'],
  props: {
    type: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: null,
    },
  },
})
export default class MyButton extends Vue {
  disabled!: boolean

  onClick(event: MouseEvent) {
    if (this.disabled) {
      /*  */
    } else {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/index.scss';

body {
  --my-button-default-height: 44px;
  --my-button-default-line-height: 1.2;
  --my-button-default-font-size: var(--my-font-size-lg);
  --my-button-default-color: var(--my-text-color);
  --my-button-default-background: var(--my-background-2);
  --my-button-default-border-color: var(--my-gray-4);
  --my-button-radius: var(--my-radius-md);

  --my-button-primary-color: var(--my-white);
  --my-button-primary-background: var(--my-primary-color);
  --my-button-primary-border-color: var(--my-primary-color);

  --my-button-disabled-opacity: var(--my-disabled-opacity);
}

.my-button {
  @include inline-flex-row(center);
  box-sizing: border-box;
  height: var(--my-button-default-height);
  margin: 0;
  padding: 0 8px;
  font-size: var(--my-button-default-font-size);
  line-height: var(--my-button-default-line-height);
  border-radius: var(--my-button-radius);
  cursor: pointer;

  &--default {
    color: var(--my-button-default-color);
    background: var(--my-button-default-background);
    border: var(--my-button-border-width) solid
      var(--my-button-default-border-color);
  }
  &--primary {
    color: var(--my-button-primary-color);
    background: var(--my-button-primary-background);
    border: var(--my-button-border-width) solid
      var(--my-button-primary-border-color);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--my-button-disabled-opacity);
  }
}
</style>
