<template>
  <div class="role">
    <role-list></role-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import RoleList from './components/List.vue'

  @Component({
    components: {
      RoleList,
    },
  })
  export default class Role extends Vue {}
</script>
