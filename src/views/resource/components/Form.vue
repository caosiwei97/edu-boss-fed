<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    center
    @close="onClose"
  >
    <el-form :model="form" size="small" ref="resource-form">
      <el-form-item label="资源名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" prop="url" :label-width="formLabelWidth">
        <el-input v-model="form.url" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="资源分类"
        prop="categoryId"
        :label-width="formLabelWidth"
      >
        <el-select v-model="form.categoryId" placeholder="请选择活动区域">
          <el-option
            v-for="item in resourceCatagories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.description"
          auto-complete="off"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
  import { saveOrUpdateResource } from '@/api/resource'
  import { ElForm } from 'element-ui/types/form'
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

  @Component
  export default class ResourceForm extends Vue {
    @Prop({ type: Array, default: () => [] })
    readonly resourceCatagories!: Array<any>

    @Prop({ type: Boolean, default: false })
    readonly isShowDialog!: boolean

    @Prop({ type: Object, default: null })
    readonly editFormItem!: any

    @Watch('editFormItem', { immediate: true })
    onEditFormItemChange(newVal: any) {
      newVal && (this.form = JSON.parse(JSON.stringify(newVal)))
    }

    get dialogFormVisible() {
      return this.isShowDialog
    }
    set dialogFormVisible(v) {
      this.$emit('update:isShowDialog', v)
    }
    formLabelWidth = '100px'
    get title() {
      return this.editFormItem ? '更新资源' : '添加资源'
    }
    get successMsg() {
      return this.editFormItem ? '更新成功' : '添加成功'
    }
    get failMsg() {
      return this.editFormItem ? '更新失败' : '添加失败'
    }
    form = {
      name: '',
      categoryId: null,
      url: '',
      description: '',
    }

    onSubmit() {
      this.hideDialog()
      this.updateResource()
    }

    async updateResource() {
      try {
        await saveOrUpdateResource(this.form)

        this.$message.success(this.successMsg)
        this.$emit('update-resource')
        this.$nextTick(() => {
          ;(this.$refs['resource-form'] as ElForm).resetFields()
        })
      } catch (error) {
        this.$message.warning(this.failMsg)
      }
    }

    hideDialog() {
      this.dialogFormVisible = false
    }

    onClose() {
      this.$nextTick(() => {
        ;(this.$refs['resource-form'] as ElForm).resetFields()
      })
      this.$emit('reset-edit')
    }
  }
</script>

<style scoped></style>
