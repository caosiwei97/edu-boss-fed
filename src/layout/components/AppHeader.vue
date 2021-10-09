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
          <el-avatar :size="35" :src="userInfo.portrait" @error="errorHandler">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </nav>
</template>

<script lang="ts">
  import { getUserInfo } from '@/api/user'
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class AppHeader extends Vue {
    userInfo = {}

    created() {
      this._getUserInfo()
    }

    async _getUserInfo() {
      try {
        const res: any = await getUserInfo()
        this.userInfo = res.content
      } catch (error) {
        console.log(error)
      }
    }

    errorHandler() {
      return true
    }

    async logout() {
      try {
        await this.$confirm('确定要退出么?', 'WARNING', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          type: 'warning',
        })
        this.$store.commit('setUser', null)
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!',
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消',
        })
      }
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
