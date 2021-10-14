<template>
  <div class="text-editor" ref="editor" style="margin-top: 30px"> </div>
</template>

<script lang="ts">
  import { uploadImg } from '@/api/course'
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import E from 'wangeditor'

  @Component
  export default class TextEditor extends Vue {
    @Prop({ type: String, default: '' })
    readonly value!: string

    mounted() {
      console.log(this.value)

      this.initEditor()
    }

    initEditor() {
      const editor = new E(this.$refs.editor as HTMLElement)
      editor.config.onchange = (newHtml: string) => {
        this.$emit('input', newHtml)
      }
      editor.config.customUploadImg = async function (
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
      editor.create()
      // 设置初始内容
      editor.txt.html(this.value)
    }
  }
</script>

<style scoped></style>
