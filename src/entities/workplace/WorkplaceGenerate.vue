<template>
<div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="workplaceML" description="The ARLEM-based document for the workplace."></page-header>
        <div class="md-layout md-gutter main-screen">
          <pre>{{ xml }}</pre>
        </div>
      <div style="clear: both;padding: 50px">&nbsp;</div>
      </div>
    </div>
  <!-- Entity Create -->

</template>

<script>
  import workplaceServices from './workplace.services.js'
  import Header from 'theme/components/Header.vue'
  export default {
    components: {
      'page-header': Header
    },
    data: function () {
      return {
        xml: ''
      }
    },
    methods: {

    },
    created () {
      document.title = 'Generate Workplaces @ ARLEM Panel'
      workplaceServices.get(this.$route.params.id, true).then((response) => {
        this.xml = response
      })
    }
  }
</script>
<style lang="scss" scoped>
  pre {
    margin: 5%;
  }
</style>
