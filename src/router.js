import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

// import Dashboard from './pages/Dashboard.vue'
import Workplaces from 'pages/Workplaces.vue'
import EntityCreate from 'pages/EntityCreate.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  routes: [
    { path: '/', component: Workplaces, name: 'workplace.list.get' },
    { path: '/workplace/create', component: EntityCreate, name: 'workplace-create' },
    { path: '/tangible/create', component: EntityCreate, name: 'tangible-create' },
    { path: '/trigger/create', component: EntityCreate, name: 'trigger-create' },
    { path: '/configurable/create', component: EntityCreate, name: 'configurable-create' },
    { path: '/sensor/create', component: EntityCreate, name: 'sensor-create' }
  ]
})

export default router
