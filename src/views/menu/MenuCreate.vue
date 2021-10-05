<template>
  <el-card class="box-card">
    <menu-form></menu-form>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import MenuForm from './components/MenuForm.vue'

  @Component({
    components: {
      MenuForm,
    },
  })
  export default class MenuCreate extends Vue {}
</script>

<style scoped></style>
