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

  import DetectableCreate from './DetectableCreate.vue'
  import PredicateCreate from './PredicateCreate.vue'
  import WarningCreate from './WarningCreate.vue'
  import HazardCreate from './HazardCreate.vue'

  export default {
    components: {
      'tabs': Tabs,
      'tab-contents': TabComponents,
      'detectable-create': DetectableCreate,
      'predicate-create': PredicateCreate,
      'warning-create': WarningCreate,
      'hazard-create': HazardCreate
    },
    created () {
      if (this.$route.params.type && this.$route.params.type !== '') {
        this.component = this.$route.params.type + '-create'
      }
    },
    data: function () {
      return {
        items: [],
        display: 'trigger',
        component: 'predicate-create'
      }
    },
    methods: {
      tabChange: function (_component) {
        this.component = _component
      },
      savedEntity: function (_entity) {
        this.items.push(_entity)
      }
    }
  }
</script>
