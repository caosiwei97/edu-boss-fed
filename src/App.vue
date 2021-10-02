<template>
  <div id="app">
    <h1 class="header">{{ msg }}</h1>
    <el-button @click="getMsg">Click</el-button>
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import request from '@/utils/request'

  @Component
  export default class App extends Vue {
    msg = 'Hello World'

    getMsg(): void {
      console.log(this.msg)
    }

    async mounted() {
      const res = await request.get('/login')
      console.log(res)
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    color: $success-color;
  }
</style>
