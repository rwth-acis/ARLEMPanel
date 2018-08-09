import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import Authentication from 'entities/auth/AuthForm.vue'

import Dashboard from 'entities/member/Dashboard.vue'
// import Settings from './pages/Settings.vue'
// import EntityCreate from 'pages/EntityCreate.vue'
// import EntityList from 'pages/EntityList.vue'

import Workplaces from 'entities/workplace/Workplaces.vue'
import WorkplaceCreate from 'entities/workplace/WorkplaceCreate.vue'
import WorkplaceGenerate from 'entities/workplace/WorkplaceGenerate.vue'

// import Workplaces from 'entities/workplace/Workplaces.vue'
import TangibleCreate from 'entities/tangible/TangibleCreate.vue'
import Tangibles from 'entities/tangible/Tangibles.vue'

import TriggerCreate from 'entities/trigger/TriggerCreate.vue'
import Triggers from 'entities/trigger/Triggers.vue'

import Configurables from 'entities/configurable/Configurables.vue'
import ConfigurableCreate from 'entities/configurable/ConfigurableCreate.vue'

import Sensors from 'entities/sensor/Sensors.vue'
import SensorsCreate from 'entities/sensor/SensorCreate.vue'

// import Activities from 'pages/Activities.vue'
import Activities from 'entities/activity/Activities.vue'
import ActivityCreate from 'entities/activity/ActivityCreate.vue'

// import Learners from 'pages/Learners.vue'

import NotFound from 'entities/auth/NotFound.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => ({y: 0}),
  routes: [
    { path: '/dashboard', component: Dashboard, name: 'member.dashboard' },
    // { path: '/settings', component: Settings, name: 'member.settings' },
    { path: '/workplaces', component: Workplaces, name: 'workplace.list' },
    { path: '/workplace/create', component: WorkplaceCreate, name: 'workplace.create' },
    { path: '/workplace/:id/generate', component: WorkplaceGenerate, name: 'workplace.generate' },
    { path: '/tangibles', component: Tangibles, name: 'tangible.list' },
    { path: '/tangible/create', component: TangibleCreate, name: 'tangible.create' },
    { path: '/tangible/:type/edit/:id', component: TangibleCreate, name: 'tangible.update' },
    { path: '/triggers', component: Triggers, name: 'trigger.list' },
    { path: '/trigger/create', component: TriggerCreate, name: 'trigger.create' },
    { path: '/trigger/:type/edit/:id', component: TriggerCreate, name: 'trigger.update' },
    { path: '/configurables', component: Configurables, name: 'configurable.list' },
    { path: '/configurable/create', component: ConfigurableCreate, name: 'configurable.create' },
    { path: '/configurable/:type/edit/:id', component: ConfigurableCreate, name: 'configurable.update' },
    { path: '/sensors', component: Sensors, name: 'sensor.list' },
    { path: '/sensor/create', component: SensorsCreate, name: 'sensor.create' },
    { path: '/sensor/edit/:id', component: SensorsCreate, name: 'sensor.update' },
    { path: '/activites', component: Activities, name: 'activity.list' },
    { path: '/activity/create', component: ActivityCreate, name: 'activity.list' },
    // { path: '/learners', component: Learners, name: 'learner.list' },
    { path: '/', component: Authentication, name: 'authentication' },
    { path: '*', component: NotFound, name: 'notfound' }

  ]
})

export default router
