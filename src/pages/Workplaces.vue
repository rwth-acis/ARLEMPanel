<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <entity-tab entity="workplaces"></entity-tab>
        <data-grid url="/api/url" model="workplaces" createLink="/workplaces/create"></data-grid>
      </div>
    </div>
</template>
<script>
  import DataGrid from 'components/DataGrid.vue'
  import EntityTabs from 'theme/components/EntityTabs.vue'
  export default {
    components: {
      'data-grid': DataGrid,
      'entity-tab': EntityTabs
    }
  }
</script>
