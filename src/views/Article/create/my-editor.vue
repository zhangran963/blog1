<template>
  <div id="editor"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'

@Options({
  name: 'MyEditor',
})
export default class MyEditor extends Vue {
  editor!: Editor
  created() {
    /*  */
  }
  mounted() {
    this.editor = new Editor({
      el: document.querySelector('#editor') as HTMLElement,
      height: '100vh',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      language: 'zh-CN',
    })
  }
}

export { Editor }
</script>

<style lang="scss" scoped>
.editor {
  // background-color: white;
}
</style>
