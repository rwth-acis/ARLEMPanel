<template>
  <div id="backend-app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <navigation></navigation>
      </md-app-toolbar>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
  import Loader from 'theme/components/Loader.vue'
  import Navigation from 'theme/components/Navigation.vue'
  export default {
    components: {
      'loader': Loader,
      'navigation': Navigation
    }
  }
</script>
<style lang="scss">
  @import "../../sass/app.scss"
</style>

