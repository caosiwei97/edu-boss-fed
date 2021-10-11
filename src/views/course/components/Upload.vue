<template>
  <div class="course-upload">
    <el-progress
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="status"
      v-if="isUploading"
    ></el-progress>
    <el-upload
      v-else
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUpload"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__tip" slot="tip"
        >只能上传jpg/png文件，且不超过{{ limit }}M</div
      >
    </el-upload>
  </div>
</template>

<script lang="ts">
  import { uploadImg } from '@/api/course'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class CourseUpload extends Vue {
    @Prop({ type: String, default: '' })
    readonly value!: string
    @Prop({ type: Number, default: 2 })
    readonly limit!: number

    percentage = 0
    isUploading = false
    status = 'success'

    get imgUrl() {
      return this.value
    }

    beforeAvatarUpload(file: any) {
      const acceptType = ['image/jpeg', 'image/png']
      const isAccepted = acceptType.includes(file.type)

      const isCorrectSize = file.size / 1024 / 1024 < this.limit

      if (!isAccepted) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isCorrectSize) {
        this.$message.error(`上传头像图片大小不能超过 ${this.limit} MB!`)
      }
      return isAccepted && isCorrectSize
    }

    async handleUpload(options: any) {
      const formData = new FormData()
      formData.append('file', options.file)
      try {
        this.isUploading = true
        const res = await uploadImg(formData, (e: ProgressEvent) => {
          this.percentage = Math.floor((e.loaded / e.total) * 100)
        })
        this.status = 'success'
        this.$emit('input', res.data['name'])
      } catch (error) {
        this.status = 'exception'
      } finally {
        this.isUploading = false
        this.percentage = 0
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader ::v-deep .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
