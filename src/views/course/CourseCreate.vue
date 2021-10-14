<template>
  <div class="course-create">
    <create-or-update></create-or-update>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CreateOrUpdate from './components/CreateOrUpdate.vue'

  @Component({
    components: {
      CreateOrUpdate,
    },
  })
  export default class CourseCreate extends Vue {}
</script>

<style scoped></style>
