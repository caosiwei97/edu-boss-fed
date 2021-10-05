<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="	菜单路径">
      <el-input v-model="form.href"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="请选择活动区域">
        <el-option label="无上级菜单" :value="-1"></el-option>
        <el-option
          v-for="item in parentMenuList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="菜单描述">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="菜单图标">
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单序号">
      <el-input v-model.number="form.orderNum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { getEditMenuInfo, saveOrUpdate } from '@/api/menu'

  @Component
  export default class MenuForm extends Vue {
    @Prop({
      type: String,
      default: 'add',
      validator: (v) => ['add', 'edit'].includes(v),
    })
    readonly formType!: string
    @Prop({
      type: [String, Number],
      default: -1,
    })
    readonly id!: string | number

    form = {
      parentId: -1,
      name: '',
      href: '',
      icon: '',
      orderNum: 0,
      description: '',
      shown: true,
    }

    parentMenuList = []

    created() {
      this._getEditMenuInfo()
    }

    async _getEditMenuInfo() {
      try {
        const res: any = await getEditMenuInfo(this.$route.params.id || -1)
        const { parentMenuList, menuInfo } = res.data

        this.parentMenuList = parentMenuList
        menuInfo && (this.form = menuInfo)
      } catch (error) {
        console.log(error)
      }
    }

    async onSubmit() {
      await saveOrUpdate(this.form)
      this.$message.success('提交成功')
      this.$router.back()
    }
  }
</script>

<style scoped></style>
