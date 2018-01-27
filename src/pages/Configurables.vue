<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Configurables" description="Configruables are the main part of ARLME Panel" buttonText="Create Activity" buttonUrl="#"></page-header>
        <entity-tab entity="configurables"></entity-tab>
        <data-grid url="/api/url" model="configurables" createLink="/configurable/create"></data-grid>
      </div>
    </div>
</template>
<script>
  import DataGrid from 'components/DataGrid.vue'
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import Header from 'theme/components/Header.vue'
  export default {
    components: {
      'data-grid': DataGrid,
      'entity-tab': EntityTabs,
      'page-header': Header
    }
  }
</script>
