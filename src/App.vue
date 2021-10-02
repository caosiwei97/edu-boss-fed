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

  @Component
  export default class App extends Vue {
    msg = 'Hello World'

    getMsg(): void {
      console.log(this.msg)
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    color: $success-color;
  }
</style>
