<template>
  <div>
    <course-list></course-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import CourseList from './components/List.vue'

  @Component({
    components: {
      CourseList,
    },
  })
  export default class Course extends Vue {}
</script>

<style scoped></style>
