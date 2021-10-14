<template>
  <div class="course-create">
    <create-or-update is-edit :course-id="courseId"></create-or-update>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import CreateOrUpdate from './components/CreateOrUpdate.vue'

  @Component({
    components: {
      CreateOrUpdate,
    },
  })
  export default class CourseEdit extends Vue {
    @Prop({ type: [String, Number], default: '' })
    readonly courseId!: string | number
  }
</script>

<style scoped></style>
