<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <entity-tab entity="workplaces"></entity-tab>
        <entity-create display="all" component="workplace-create"></entity-create>
      </div>
    </div>
</template>
<script>
  import DataGrid from 'components/DataGrid.vue'
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import EntityCreate from 'theme/components/EntityCreate.vue'
  export default {
    components: {
      'data-grid': DataGrid,
      'entity-tab': EntityTabs,
      'entity-create': EntityCreate
    }
  }
</script>
