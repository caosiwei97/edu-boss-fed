<template>
  <div class="course-list">
    <el-form :model="filterParams" ref="filter-form" :inline="true">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="filterParams.courseName"></el-input>
      </el-form-item>
      <el-form-item label="课程状态" prop="status">
        <el-select v-model="filterParams.status" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="上架" :value="1"></el-option>
          <el-option label="下架" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="loading" @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleQuery" :disabled="loading"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-card>
      <div slot="header">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="$router.push({ name: 'course-create' })"
          >新建课程</el-button
        >
      </div>
      <el-table :data="courses" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleSelectRole(scope.row)" size="small"
              >编辑</el-button
            >
            <el-button @click="handleSelectRole(scope.row)" size="small"
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Form } from 'element-ui'
  import { changeState, getCoursePages } from '@/api/course'

  @Component
  export default class CourseList extends Vue {
    courses = []
    filterParams = {
      currentPage: 0,
      pageSize: 10,
      courseName: '',
      status: '',
    }
    totalCount = 0
    loading = true
    dialogVisible = false
    roles = []
    roleIdList = []
    currentUser = null // 分配角色的当前用户

    created() {
      this.loadCourses()
    }

    async loadCourses() {
      const res = await getCoursePages(this.filterParams)
      this.courses = res.data['records']
      this.totalCount = res.data['total']
      this.loading = false
    }

    handleSizeChange(val: number) {
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1
      this.loadCourses()
    }

    handleCurrentChange(val: number) {
      this.filterParams.currentPage = val
      this.loadCourses()
    }

    async handleStateChange(course: any) {
      try {
        await changeState({
          courseId: course.id,
          status: course.status,
        })
        const statusText = course.status === 0 ? '下架成功' : '上架成功'
        this.$message.success(statusText)
        this.loadCourses()
      } catch (error) {
        this.loadCourses()
      }
    }

    handleQuery() {
      this.filterParams.currentPage = 1
      this.loadCourses()
    }

    handleReset() {
      ;(this.$refs['filter-form'] as Form).resetFields()
      this.loadCourses()
    }

    // async handleSelectRole(role: any) {
    //   const [allRoles, userRoles] = await Promise.all([
    //     getAllRoles(),
    //     getUserRole(role.id),
    //   ])
    //   this.dialogVisible = true
    //   this.roles = allRoles.data
    //   this.currentUser = role
    //   this.roleIdList = (userRoles.data as any).map(
    //     (item: { id: any }) => item.id,
    //   )
    // }

    // async handleAllocRole() {
    //   await allocateUserRoles({
    //     userId: (this.currentUser as any).id,
    //     roleIdList: this.roleIdList,
    //   })
    //   this.$message.success('操作成功')
    //   this.dialogVisible = false
    // }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin: 20px auto;
    text-align: center;
  }
</style>
