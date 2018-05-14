import Vue from 'vue'
import AppLayout from './theme/layouts/Main.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const app = new Vue({
  router,
  ...AppLayout,
  store
})

axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.response.use(undefined, function (error) {
  if (error.response.status > 200) {
    store.dispatch('showSnackBar', error.response.data.message)
  }
})
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ` + token
  }
  return config
})

export { app, router, store }
