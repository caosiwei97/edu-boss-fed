<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header">分配菜单</div>
      <el-tree
        ref="menu"
        :data="menus"
        :props="props"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        default-expand-all
      >
      </el-tree>
      <div class="buttons">
        <el-button @click="clearKeys">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { allocateMenus, getAllMenuNodes, getRoleMenus } from '@/api/menu'
  import router from '@/router'
  import { Tree } from 'element-ui'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class AllocMenu extends Vue {
    @Prop({ type: [String, Number], default: '' })
    readonly roleId!: string | number

    menus = []
    defaultCheckedKeys = []

    props = {
      label: 'name',
      children: 'subMenuList',
    }

    created() {
      this.loadAllMenus()
      this.loadRoleMenus()
    }

    async loadAllMenus() {
      const res = await getAllMenuNodes()
      this.menus = res.data
    }

    async loadRoleMenus() {
      const res = await getRoleMenus(this.roleId)
      this.getCheckedKeys(res.data)
    }

    getCheckedKeys(menus: Array<any>) {
      menus
        .filter((item) => item.selected)
        .forEach((item) => {
          this.defaultCheckedKeys = [...this.defaultCheckedKeys, item.id] as any
          if (item.subMenuList) {
            this.getCheckedKeys(item.subMenuList)
          }
        })
    }

    async onSave() {
      // 拿到所有选中的 key
      try {
        const keys = (this.$refs.menu as Tree).getCheckedKeys()
        await allocateMenus({
          roleId: this.roleId,
          menuIdList: keys,
        })
        this.$message.success('保存成功')
        this.$router.back()
      } catch (error) {
        if (error?.code === '10000') {
          this.$message.error(error.mesg)
        }
      }
    }

    clearKeys() {
      ;(this.$refs.menu as Tree).setCheckedKeys([])
    }
  }
</script>

<style scoped lang="scss">
  .buttons {
    text-align: center;
  }
</style>
