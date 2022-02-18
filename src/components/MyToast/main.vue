<template>
  <div class="my-toast" v-if="show && text" @click.stop="closeHandler">
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { withInstall } from '../with-install'

@Options({
  name: 'MyToast',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    onClosed: {
      type: Function,
    },
  },
  watch: {
    show(val) {
      if (!val) {
        setTimeout(() => {
          this.$emit('closed')
        })
      }
    },
  },
})
class MyToast extends Vue {
  mounted() {
    // console.log('MyToast.mounted', this)
  }

  closeHandler() {
    this.$emit('update:show', false)
  }
}
export default withInstall(MyToast)
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.my-toast {
  min-height: 1em;
  min-width: 200px;
  max-width: 400px;
  background-color: darkcyan;
  color: white;
  border-radius: $border-radius-middle;

  @include inline-flex-row(center, center);

  padding: 0.4em 0.6em;
}
</style>
