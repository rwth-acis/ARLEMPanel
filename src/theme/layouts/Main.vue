<template>
  <div id="backend-app" style="height:100%;overflow-y:hidden">
    <template v-if="isAuthenticated">
      <md-app :md-scrollbar="false">
        <md-app-toolbar class="md-primary">
          <navigation></navigation>
        </md-app-toolbar>
        <md-app-content>
          <router-view></router-view>
          <div>&nbsp;</div>
        </md-app-content>
      </md-app>
    </template>
    <template v-if="!isAuthenticated">
      <div class="mdl-layout mdl-js-layout">
        <router-view></router-view>
      </div>
    </template>
    <md-snackbar :md-active="sbarActive" md-position="center" :md-duration="duration" md-active.sync="true" md-persistent>
      <span v-html="sbarMessage"></span>
      <md-button class="md-primary" @click="hideSnackBar">Close</md-button>
    </md-snackbar>
  </div>
</template>
<script>
  import Loader from 'theme/components/Loader.vue'
  import Navigation from 'theme/components/Navigation.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data: function () {
      return {
        isLoggedIn: false,
        duration: 5000
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'sbarActive', 'sbarMessage'])
    },
    components: {
      'loader': Loader,
      'navigation': Navigation
    },
    methods: {
      ...mapActions({
        hideSnackBar: 'hideSnackBar'
      })
    }
  }
</script>
<style lang="scss">
  @import "../../sass/app.scss"
</style>

