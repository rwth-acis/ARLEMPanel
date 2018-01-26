<template>
  <div id="backend-app">
    <md-app>
      <md-app-toolbar class="md-primary">
        <navigation></navigation>
        <page-header></page-header>
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
  import Header from 'theme/components/Header.vue'
  export default {
    components: {
      'loader': Loader,
      'navigation': Navigation,
      'page-header': Header
    }
  }
</script>
<style lang="scss">
  @import "../../sass/app.scss"
</style>

