<template>
  <div id="backend-app">
    <template v-if="isLoggedIn">
      <md-app>
        <md-app-toolbar class="md-primary">
          <navigation></navigation>
        </md-app-toolbar>
        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </template>
    <template v-if="!isLoggedIn">
      <div class="mdl-layout mdl-js-layout">
        <img src="http://127.0.0.1:8000/images/logo.png" class="logo" />
        <router-view></router-view>
      </div>
    </template>
  </div>
</template>
<script>
  import Loader from 'theme/components/Loader.vue'
  import Navigation from 'theme/components/Navigation.vue'
  export default {
    data: function () {
      return {
        isLoggedIn: false
      }
    },
    components: {
      'loader': Loader,
      'navigation': Navigation
    },
    created () {
      if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
        this.isLoggedIn = true
      }
    }
  }
</script>
<style lang="scss">
  @import "../../sass/app.scss"
</style>

