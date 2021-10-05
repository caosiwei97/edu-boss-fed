<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form
        :inline="true"
        :model="queryParam"
        class="demo-form-inline"
        size="small"
        ref="form"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="queryParam.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="queryParam.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="queryParam.categoryId" clearable>
            <el-option
              v-for="item in resourceCatagories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="resource-add">
      <el-button size="mini" type="primary" @click="add">添加</el-button>
      <el-button size="mini" type="primary">资源分类</el-button>
      <resource-form
        :resourceCatagories="resourceCatagories"
        :editFormItem="editFormItem"
        :isShowDialog.sync="isShowDialog"
        @update-resource="updateResource"
        @reset-edit="resetEditForm"
      ></resource-form>
    </div>
    <div class="resource-list">
      <el-table
        :data="resources"
        stripe
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="资源名称"> </el-table-column>
        <el-table-column prop="url" label="菜单路径"> </el-table-column>
        <el-table-column prop="description" label="资源描述"> </el-table-column>
        <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="mini" @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="handleDelete(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParam.current"
        :page-sizes="[5, 10, 20]"
        :page-size="queryParam.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {
    deleteResource,
    getAllCategories,
    getResourcePages,
  } from '@/api/resource'
  import { ElForm } from 'element-ui/types/form'
  import ResourceForm from './Form.vue'

  @Component({
    components: {
      ResourceForm,
    },
  })
  export default class ResourceList extends Vue {
    queryParam = {
      name: '',
      startCreateTime: '',
      url: '',
      categoryId: undefined,
      current: 1,
      size: 10,
    }

    resourceCatagories = []
    resources = []
    totalCount = 0
    isLoading = false
    isShowDialog = false
    editFormItem = null

    created() {
      this.loadAllResourceCatagories()
      this.loadAllResources()
    }

    async loadAllResourceCatagories() {
      try {
        const res = await getAllCategories({})
        this.resourceCatagories = res.data
      } catch (error) {
        console.log(error)
      }
    }

    async loadAllResources() {
      if (this.isLoading) return
      this.isLoading = true
      try {
        const res = await getResourcePages(this.queryParam)
        this.resources = res.data['records']
        this.totalCount = res.data['total']
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }

    onSubmit() {
      this.loadAllResources()
    }

    onReset() {
      ;(this.$refs.form as ElForm).resetFields()
    }

    handleSizeChange(val: number) {
      this.queryParam.size = val
      this.queryParam.current = 1
      this.loadAllResources()
    }

    handleCurrentChange(val: number) {
      this.queryParam.current = val
      this.loadAllResources()
    }

    handleEdit(row: any) {
      this.isShowDialog = true
      this.editFormItem = row
    }

    handleDelete(id: number) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          await deleteResource(id)
          this.$message.success('删除成功')
          this.loadAllResources() // 更新数据列表
        })
        .catch((err) => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }

    add() {
      this.resetEditForm()
      this.isShowDialog = true
    }

    updateResource() {
      this.resetEditForm()
      this.loadAllResources()
    }

    resetEditForm() {
      this.editFormItem = null
    }
  }
</script>

<style scoped lang="scss">
  .pagination {
    margin: 20px auto;
    text-align: center;
  }
</style>
