<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <entity-tab :entity="component"></entity-tab>
        <data-grid url="/api/url" :model="component" createLink="/workplaces/create"></data-grid>
      </div>
    </div>
</template>
<script>
  import DataGrid from 'components/DataGrid.vue'
  import EntityTabs from 'theme/components/EntityTabs.vue'
  export default {
    data: function () {
      return {
        component: 'workplaces'
      }
    },
    mounted () {
      this.component = this.$router.currentRoute.name
    },
    components: {
      'data-grid': DataGrid,
      'entity-tab': EntityTabs
    },
    methods: {
      parseComponent: function (route) {
        if (route === 'workplace.list') {
          this.component = 'workplaces'
        } else if (route === 'tangible.list') {
          this.component = 'tangibles'
        } else if (route === 'trigger.list') {
          this.component = 'triggers'
        } else if (route === 'configurable.list') {
          this.component = 'configurables'
        }
      }
    }
  }
</script>
