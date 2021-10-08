<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>筛选搜索</span>
      <div class="search">
        <div class="search-input">
          <el-input
            placeholder="请输入角色名称"
            v-model="form.name"
            clearable
            size="small"
          >
          </el-input>
        </div>
        <div class="search-buttons">
          <el-button type="primary" size="small" @click="loadRoles"
            >查询搜索</el-button
          >
        </div>
      </div>
    </div>
    <el-button size="small" @click="showDialog">添加角色</el-button>
    <el-table :data="roles" stripe style="width: 100%">
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              size="mini"
              @click="
                $router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id,
                  },
                })
              "
              >分配菜单</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="
                $router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id,
                  },
                })
              "
              >分配资源</el-button
            >
          </div>
          <div>
            <el-button type="text" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="'添加角色'"
      :visible.sync="dialogFormVisible"
      @close="handleCancel"
    >
      <role-form
        :editModel="editModel"
        v-if="dialogFormVisible"
        @success="handleSuccess"
        @cancel="handleCancel"
      ></role-form>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { deleteRole, getRoles, Role } from '@/api/role'
  import RoleForm from './Form.vue'
  import { createOrEditRole } from '@/api/role'

  @Component({
    components: {
      RoleForm,
    },
  })
  export default class RoleList extends Vue {
    dialogFormVisible = false
    roles = []
    form = {
      current: 1,
      size: 50,
      name: '',
    } // 查询条件
    editModel = null
    created() {
      this.loadRoles()
    }

    async loadRoles() {
      const res: any = await getRoles(this.form)
      this.roles = res.data.records
    }

    showDialog() {
      this.dialogFormVisible = true
    }

    hideDialog() {
      this.dialogFormVisible = false
    }

    handleEdit(row: any) {
      this.editModel = row
      this.showDialog()
    }

    async handleSuccess(form: Role) {
      await createOrEditRole(form)
      this.hideDialog()
      this.$message.success('提交成功')
      this.loadRoles()
    }

    handleCancel() {
      this.editModel = null
      this.hideDialog()
    }

    handleDelete(id: string | number) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          await deleteRole(id)
          this.$message.success('删除成功')
          this.loadRoles() // 更新数据列表
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
</script>

<style scoped lang="scss">
  .search {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
</style>
