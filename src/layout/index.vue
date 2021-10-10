<template>
  <el-container class="wrapper">
    <app-sidebar></app-sidebar>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import AppSidebar from './components/AppSidebar.vue'
  import AppHeader from './components/AppHeader.vue'

  @Component({
    components: {
      AppSidebar,
      AppHeader,
    },
  })
  export default class LayoutIndex extends Vue {}
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100vh;
    min-width: 980px;

    .el-header {
      position: sticky;
      top: 0;
      z-index: 999;
      background: white;
    }
  }
</style>
