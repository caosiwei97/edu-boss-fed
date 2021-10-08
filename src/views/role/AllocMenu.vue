<template>
  <div class="alloc-menu"> </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class AllocMenu extends Vue {
    @Prop({ type: [String, Number], default: '' })
    readonly roleId!: string | number
  }
</script>

<style scoped></style>
