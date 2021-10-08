<template>
  <div class="alloc-resource">
    <el-card class="box-card">
      <div slot="header">分配资源</div>
      <el-tree
        ref="resource"
        :data="resources"
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
  import { getRoleResources, allocateResources } from '@/api/resource'
  import { Tree } from 'element-ui'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class AllocResource extends Vue {
    @Prop({ type: [String, Number], default: '' })
    readonly roleId!: string | number

    resources = []
    defaultCheckedKeys = []

    props = {
      label: 'name',
      children: 'resourceList',
    }

    created() {
      this.loadResources()
    }

    async loadResources() {
      const res = await getRoleResources(this.roleId)
      this.resources = res.data
      this.getCheckedKeys(this.resources)
    }

    getCheckedKeys(resources: Array<any>) {
      resources
        .filter((item) => item.selected)
        .forEach((item) => {
          this.defaultCheckedKeys = [...this.defaultCheckedKeys, item.id] as any
          if (item.resourceList) {
            this.getCheckedKeys(item.resourceList)
          }
        })
    }

    async onSave() {
      // 拿到所有选中的 key
      try {
        const keys = (this.$refs.resource as Tree).getCheckedKeys()
        await allocateResources({
          roleId: this.roleId,
          resourceIdList: keys,
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
      ;(this.$refs.resource as Tree).setCheckedKeys([])
    }
  }
</script>

<style scoped lang="scss">
  .buttons {
    text-align: center;
  }
</style>
