<template>
  <div class="user-list">
    <user-list></user-list>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import UserList from './components/List.vue'

  @Component({
    components: {
      UserList,
    },
  })
  export default class User extends Vue {}
</script>

<style scoped></style>
