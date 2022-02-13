<template>
  <button class="my-button">
    <div v-if="loading">loading</div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'MyButton',
  props: {
    loading: {
      type: Boolean,
      default: null,
    },
  },
  components: {},
})
export default class MyButton extends Vue {}
</script>
