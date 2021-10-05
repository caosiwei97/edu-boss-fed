<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="handleClick">添加菜单</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column prop="name" label="菜单名称"> </el-table-column>
      <el-table-column prop="level" label="菜单级数"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="orderNum" label="菜单序号"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button size="mini" @click="handleEdit(row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
  import { deleteMenu, getAllMenu } from '@/api/menu'
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Menu extends Vue {
    tableData = []

    created() {
      this._getAllMenu()
    }

    async _getAllMenu() {
      try {
        const res = await getAllMenu()
        this.tableData = res.data
      } catch (error) {
        console.log(error)
      }
    }

    handleClick() {
      this.$router.push({ name: 'menu-create' })
    }

    handleEdit(id: number) {
      this.$router.push({ name: 'menu-edit', params: { id: id.toString() } })
    }

    handleDelete(id: string | number) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          await deleteMenu(id)
          this.$message.success('删除成功')
          this._getAllMenu() // 更新数据列表
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
</script>

<style scoped></style>
