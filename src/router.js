import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import Dashboard from './pages/Dashboard.vue'
import Settings from './pages/Settings.vue'
import EntityCreate from 'pages/EntityCreate.vue'
import EntityList from 'pages/EntityList.vue'

import Workplaces from 'pages/Workplaces.vue'
import Tangibles from 'pages/Tangibles.vue'
import Triggers from 'pages/Triggers.vue'
import Configurables from 'pages/Configurables.vue'
import Sensors from 'pages/Sensors.vue'

import Activities from 'pages/Activities.vue'

import Learners from 'pages/Learners.vue'

import NotFound from 'pages/NotFound.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => ({y: 0}),
  routes: [
    { path: '/dashboard', component: Dashboard, name: 'member.dashboard' },
    { path: '/settings', component: Settings, name: 'member.settings' },
    { path: '/workplaces', component: Workplaces, name: 'workplace.list' },
    { path: '/workplace/create', component: EntityCreate, name: 'workplace.create' },
    { path: '/tangibles', component: Tangibles, name: 'tangible.list' },
    { path: '/tangible/create', component: EntityCreate, name: 'tangible.create' },
    { path: '/triggers', component: Triggers, name: 'trigger.list' },
    { path: '/trigger/create', component: EntityCreate, name: 'trigger.create' },
    { path: '/configurables', component: Configurables, name: 'configurable.list' },
    { path: '/configurable/create', component: EntityCreate, name: 'configurable.create' },
    { path: '/sensors', component: Sensors, name: 'sensor.list' },
    { path: '/sensor/create', component: EntityCreate, name: 'sensor.create' },
    { path: '/activites', component: Activities, name: 'activity.list' },
    { path: '/learners', component: Learners, name: 'learner.list' },
    { path: '/', component: EntityList, name: 'workplace.list' },
    { path: '*', component: NotFound, name: 'notfound' }

  ]
})

export default router
