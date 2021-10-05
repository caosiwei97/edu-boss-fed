<template>
  <el-card class="box-card">
    <menu-form formType="edit"></menu-form>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import MenuForm from './components/MenuForm.vue'

  @Component({
    components: {
      MenuForm,
    },
  })
  export default class MenuEdit extends Vue {}
</script>

<style scoped></style>
