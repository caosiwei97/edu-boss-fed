<template>
  <el-form :model="form">
    <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色编码" :label-width="formLabelWidth">
      <el-input v-model="form.code" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="formLabelWidth">
      <el-input v-model="form.description" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class RoleForm extends Vue {
    @Prop({ type: Object, default: null })
    readonly editModel!: any

    form = {
      code: '',
      name: '',
      description: '',
    }

    created() {
      if (this.editModel) {
        this.form = JSON.parse(JSON.stringify(this.editModel))
      }
    }

    submit() {
      this.$emit('success', this.form)
    }
    cancel() {
      this.$emit('cancel')
    }
  }
</script>

<style scoped></style>
