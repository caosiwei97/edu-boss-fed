<template>
  <el-aside width="200px">
    <el-menu default-active="/" @open="handleOpen" @close="handleClose" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/resource">资源管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/course"
        ><template slot="title">
          <i class="el-icon-date"></i>
          <span>课程管理</span>
        </template></el-menu-item
      >
      <el-menu-item index="/user">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template></el-menu-item
      >
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">广告列表</el-menu-item>
        <el-menu-item index="/advert-space">广告位列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class AppSidebar extends Vue {
    handleOpen(index?: string, indexPath?: string) {
      console.log(index, indexPath)
    }
    handleClose(index?: string, indexPath?: string) {
      console.log(index, indexPath)
    }
  }
</script>

<style scoped lang="scss">
  .el-aside {
    .el-menu {
      min-height: 100vh;
    }
  }
</style>
