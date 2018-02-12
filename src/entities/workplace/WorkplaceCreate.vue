<template>
  <!-- Entity Create -->
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-20">
      <tabs :component="component" :display="display" @changeTab="tabChange"></tabs>
    </div>
    <div class="md-layout-item md-size-60">
      <keep-alive><component :is="component" @saved="savedEntity"></component></keep-alive>
    </div>
    <div class="md-layout-item">
      <div v-for="item in items" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
  import Tabs from 'theme/components/Tabs.vue'
  import TabComponents from 'theme/components/TabComponents.vue'

  // import WorkplaceCreate from 'entityComponent/workplaces/WorkplaceCreate.vue'

  import PersonCreate from 'entities/tangible/PersonCreate.vue'
  import PlaceCreate from 'entities/tangible/PlaceCreate.vue'
  import ThingCreate from 'entities/tangible/ThingCreate.vue'

  import DetectableCreate from 'entities/trigger/DetectableCreate.vue'
  import PredicateCreate from 'entities/trigger/PredicateCreate.vue'
  import WarningCreate from 'entities/trigger/WarningCreate.vue'
  import HazardCreate from 'entities/trigger/HazardCreate.vue'

  import AppCreate from 'entities/configurable/AppCreate.vue'
  import DeviceCreate from 'entities/configurable/DeviceCreate.vue'

  export default {
    components: {
      'tabs': Tabs,
      'tab-contents': TabComponents,
      // 'workplace-create': WorkplaceCreate,
      'person-create': PersonCreate,
      'place-create': PlaceCreate,
      'thing-create': ThingCreate,
      'detectable-create': DetectableCreate,
      'predicate-create': PredicateCreate,
      'warning-create': WarningCreate,
      'hazard-create': HazardCreate,
      'app-create': AppCreate,
      'device-create': DeviceCreate
    },

    data: function () {
      return {
        items: [],
        display: 'all',
        component: 'workplace-create'
      }
    },
    methods: {
      tabChange: function (_component) {
        this.component = _component
      },
      savedEntity: function (_entity) {
        this.items.push(_entity)
      },
      parseComponent: function (route) {
        if (route === 'workplace-create') {
          this.component = 'workplace-create'
          this.display = 'all'
        } else if (route === 'tangible-create') {
          this.component = 'person-create'
          this.display = 'tangible'
        } else if (route === 'trigger-create') {
          this.component = 'predicate-create'
          this.display = 'trigger'
        } else if (route === 'configurable-create') {
          this.component = 'app-create'
          this.display = 'configurable'
        }
      }
    }
  }
</script>
