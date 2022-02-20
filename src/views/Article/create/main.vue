<template>
  <div class="page article-create">
    <my-editor class="left" ref="editor"></my-editor>
    <ul class="right">
      <my-button @click="getHTML">获取HTML</my-button>
      <my-button @click="getMarkdown">获取Markdown</my-button>
      <my-button @click="save">保存</my-button>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { PageNames } from '@/constant'
import { saveArticle } from '@/services/article'
import MyEditor, { Editor } from './my-editor.vue'

type MyEditorCtx = InstanceType<typeof MyEditor>
@Options({
  name: PageNames.Article.Create,
  components: {
    MyEditor,
  },
})
export default class Article extends Vue {
  editor!: Editor
  mounted() {
    this.editor = (this.$refs.editor as MyEditorCtx).editor
  }

  getHTML() {
    return this.editor.getHTML()
    // console.log('* 组件.HTML: ', )
  }

  getMarkdown() {
    return this.editor.getMarkdown()
    // console.log('* 组件.markdown: ', )
  }

  save() {
    const markdownStr = this.getMarkdown()
    console.log('* before.send: ', markdownStr)
    saveArticle({
      mode: 'markdown',
      content: markdownStr,
    })
      .then(() => {
        this.$toast('已保存')
      })
      .catch((errMsg) => {
        this.$toast(errMsg)
      })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';

.article-create {
  width: 100vw;
  @include flex-row(space-between, stretch);

  .left {
    flex: 1;
  }
  .right {
    width: 120px;
    @include flex-col(center, stretch);

    margin: 0;
    padding: 0;
    background-color: darkblue;

    .my-button {
      margin: 10px;
    }
  }
}
</style>
