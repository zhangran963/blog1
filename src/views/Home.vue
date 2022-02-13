<template>
  <div class="page home">
    <div>根页面</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '../constant'

@Options({
  name: PageNames.Home,
  components: {},
})
export default class Home extends Vue {
  mounted() {
    this.$router.replace({ name: PageNames.Register })
  }
}
</script>
