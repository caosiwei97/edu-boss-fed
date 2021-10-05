<template>
  <div class="resource-list">
    <resource-list></resource-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import ResourceList from './components/List.vue'
  @Component({
    components: {
      ResourceList,
    },
  })
  export default class Resource extends Vue {}
</script>

<style scoped></style>
