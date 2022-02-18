<template>
  <ul class="home-list">
    <li class="item">列表1</li>
  </ul>
</template>

<script lang="ts">
import { sleep } from '@/utils'
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '@/constant'
import { getList, IArticleItem } from '@/services/article'

@Options({
  name: `${PageNames.Home}List`,
  components: {},
})
export default class HomeList extends Vue {
  items: IArticleItem[] = []

  created() {
    this.getList()
  }

  async getList() {
    const items = await getList()
    this.items = items
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.home-list {
  .item {
    @include flex-row(center);
  }
}
</style>
