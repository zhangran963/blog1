<template>
  <div class="page article-detail">
    <h3>article页面 - main</h3>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '@/constant'
import { sleep } from '@/utils/index'
import { getList, IArticleItem } from '@/services/article'

@Options({
  name: PageNames.Article.Detail,
  components: {},
})
export default class Article extends Vue {
  loading = false
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
