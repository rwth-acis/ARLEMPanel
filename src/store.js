import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from 'entities/auth/auth.module'
import workplaceModule from 'entities/workplace/workplace.module'
import snackbarModule from './theme/snackbar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AuthModule,
    snackbarModule,
    workplaceModule
  }
})

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
        store.state.AuthModule.isAuthenticated = true
      }
    }
  })
}

export default store
