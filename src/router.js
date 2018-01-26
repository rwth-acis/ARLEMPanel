import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

// import Dashboard from './pages/Dashboard.vue'
import Workplaces from 'pages/Workplaces.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  routes: [{
    path: '/', component: Workplaces, name: 'workplace.list.get'
  }]
})

export default router
