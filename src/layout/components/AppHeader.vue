<template>
  <nav>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div class="avatar">
          <el-avatar :size="35" src="https://empty" @error="errorHandler">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户ID</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </nav>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class AppHeader extends Vue {
    errorHandler() {
      return true
    }
  }
</script>

<style scoped lang="scss">
  nav {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-dropdown-link {
      .avatar {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
