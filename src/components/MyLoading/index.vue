<template>
  <div class="van-loading">
    <span class="van-loading__spinner">
      <i
        v-for="(v, i) of 12"
        :class="['van-loading__line', `van-loading__line--${i + 1}`]"
        :key="i"
      />
    </span>
    <slot class="van-loading__text"></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'MyLoading',
  props: {
    color: {
      type: String,
      default: '#333',
    },
    size: {
      type: String,
      default: '14px',
    },
  },
  components: {},
})
export default class MyLoading extends Vue {}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
