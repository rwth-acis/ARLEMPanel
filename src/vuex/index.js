import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import snackbarModule from './snackbar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authModule,
    snackbarModule
  }
})

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('token') && window.localStorage.getItem('token') !== '') {
        store.state.authModule.isAuthenticated = true
      }
    }
  })
}

export default store
