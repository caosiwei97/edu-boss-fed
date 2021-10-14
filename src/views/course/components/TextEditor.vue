<template>
  <div class="text-editor" ref="editor" style="margin-top: 30px"> </div>
</template>

<script lang="ts">
  import { uploadImg } from '@/api/course'
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import E from 'wangeditor'

  @Component
  export default class TextEditor extends Vue {
    @Prop({ type: String, default: '' })
    readonly value!: string

    @Watch('value')
    onValueChanged(val: string) {
      this.editor && this.editor.txt.html(val)
    }

    editor: E | null = null

    mounted() {
      this.initEditor()
    }

    initEditor() {
      this.editor = new E(this.$refs.editor as HTMLElement)
      this.editor.config.onchange = (newHtml: string) => {
        this.$emit('input', newHtml)
      }
      this.editor.config.customUploadImg = async function (
        resultFiles: Array<File>,
        insertImgFn: any,
      ) {
        const formData = new FormData()
        formData.append('file', resultFiles[0])
        try {
          const res = await uploadImg(formData)
          insertImgFn(res.data['name'])
        } catch (error) {
          console.log(error)
        }
      }
      this.editor.create()
      // 设置初始内容
      this.editor.txt.html(this.value)
    }
  }
</script>

<style scoped></style>
