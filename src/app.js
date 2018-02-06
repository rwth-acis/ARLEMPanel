import Vue from 'vue'
import AppLayout from './theme/layouts/Main.vue'
import router from './router'
import store from './vuex/index.js'
import axios from 'axios'

const app = new Vue({
  router,
  ...AppLayout,
  store
})

axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.response.use(undefined, function (error) {
  if (error.response.status > 200) {
    store.dispatch('showSnackBar', error.response.data.message)
    console.log(error.response.data.message)
  }
})

export { app, router, store }
