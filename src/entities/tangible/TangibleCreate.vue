<template>
  <!-- Entity Create -->
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-20">
      <tabs :component="component" :display="display" @changeTab="tabChange"></tabs>
    </div>
    <div class="md-layout-item md-size-60">
      <keep-alive><component :independent="true" :is="component" @saved="savedEntity"></component></keep-alive>
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
  import PersonCreate from './PersonCreate.vue'
  import PlaceCreate from './PlaceCreate.vue'
  import ThingCreate from './ThingCreate.vue'

  export default {
    components: {
      'tabs': Tabs,
      'tab-contents': TabComponents,
      'person-create': PersonCreate,
      'place-create': PlaceCreate,
      'thing-create': ThingCreate
    },
    data: function () {
      return {
        items: [],
        display: 'tangible',
        component: 'person-create'
      }
    },
    methods: {
      tabChange: function (_component) {
        this.component = _component
      },
      savedEntity: function (_entity) {
        this.items.push(_entity)
      }
    },
    created () {
      if (this.$route.params.type && this.$route.params.type !== '') {
        this.component = this.$route.params.type + '-create'
        document.title = 'Edit Tangibles @ ARLEM Panel'
      } else {
        document.title = 'Create Tangibles @ ARLEM Panel'
      }
    }
  }
</script>
