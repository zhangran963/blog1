<template>
  <div class="my-input">
    <input
      class="my-input-input"
      :type="innerType"
      :disabled="disabled"
      :value="modelValue"
      v-bind="$attrs"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'MyInput',
  inheritAttrs: true,
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    innerType() {
      return this.type
    },
  },
})
export default class MyInput extends Vue {
  disabled!: boolean
  value!: string

  mounted() {
    // console.log('* this', this.value)
  }
  onInput(event: InputEvent) {
    if (this.disabled) {
      /*  */
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { value } = event.target
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

body {
  --my-input-default-min-height: 44px;
  --my-input-default-font-size: var(--my-font-size-lg);
  --my-input-default-line-height: 1.2;

  --my-input-default-color: var(--my-text-color);
  --my-input-default-background: var(--my-background-2);
  --my-input-default-border-color: var(--my-gray-4);
  --my-input-radius: var(--my-radius-md);
  --my-input-primary-color: var(--my-white);
  --my-input-primary-background: var(--my-primary-color);
  --my-input-primary-border-color: var(--my-primary-color);
  --my-input-disabled-opacity: var(--my-disabled-opacity);
}

.my-input {
  @include inline-flex-row(center);
  box-sizing: border-box;

  &-input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 15px;
    outline: 0;
    border-width: 0;

    font-size: var(--my-input-default-font-size);
    line-height: var(--my-input-default-line-height);
    min-height: var(--my-input-default-min-height);

    /* 密码: 加大星号文本的间距 */
    &[type='password'] {
      letter-spacing: 6px;
    }
    /* placeholder: 文本的间距不变 */
    &::placeholder {
      line-height: normal; // input的 placeholder 垂直居中
      color: darkgray;
      letter-spacing: 0px;
    }
  }
}
</style>
