<template>
  <div id="app">
    <h1 @click="getMsg">{{ msg }}</h1>
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
