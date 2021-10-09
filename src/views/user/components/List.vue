<template>
  <el-card>
    <div slot="header">
      <el-form :model="filterParams" ref="filter-form" :inline="true">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="loading" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleQuery" :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="users" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="用户ID"> </el-table-column>
      <el-table-column prop="name" label="头像">
        <template slot-scope="scope">
          <img
            width="30px"
            :src="
              scope.row.portrait ||
              'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="createTime" label="注册时间"> </el-table-column>
      <el-table-column prop="name" label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleForbidUser(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleSelectRole(scope.row)"
            >分配角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%">
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole">确 定</el-button>
      </span>
    </el-dialog>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="filterParams.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="filterParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { forbidUser, getUserPages } from '@/api/user'
  import { Form } from 'element-ui'
  import { allocateUserRoles, getAllRoles, getUserRole } from '@/api/role'

  @Component
  export default class UserList extends Vue {
    users = []
    filterParams = {
      currentPage: 1,
      pageSize: 10,
      phone: '',
      startCreateTime: '',
      endCreateTime: '',
      rangeDate: [],
    }
    totalCount = 0
    loading = true
    dialogVisible = false
    roles = []
    roleIdList = []
    currentUser = null // 分配角色的当前用户

    created() {
      this.loadUsers()
    }

    async loadUsers() {
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const res = await getUserPages(this.filterParams)
      this.users = res.data['records']
      this.totalCount = res.data['total']
      this.loading = false
    }

    handleSizeChange(val: number) {
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1
      this.loadUsers()
    }

    handleCurrentChange(val: number) {
      this.filterParams.currentPage = val
      this.loadUsers()
    }

    async handleForbidUser(user: any) {
      try {
        await forbidUser(user.id)
      } catch (error) {
        this.loadUsers()
      }
    }

    handleQuery() {
      this.filterParams.currentPage = 1
      this.loadUsers()
    }

    handleReset() {
      ;(this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    }

    async handleSelectRole(role: any) {
      const [allRoles, userRoles] = await Promise.all([
        getAllRoles(),
        getUserRole(role.id),
      ])
      this.dialogVisible = true
      this.roles = allRoles.data
      this.currentUser = role
      this.roleIdList = (userRoles.data as any).map(
        (item: { id: any }) => item.id,
      )
    }

    async handleAllocRole() {
      await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList,
      })
      this.$message.success('操作成功')
      this.dialogVisible = false
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin: 20px auto;
    text-align: center;
  }
</style>
