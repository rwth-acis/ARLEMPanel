<template>
  <!-- Entity Create -->
  <div class="md-layout md-gutter main-screen">
    <pre>
      {{ xml }}
    </pre>
  </div>
</template>

<script>
  import workplaceServices from './workplace.services.js'

  export default {
    data: function () {
      return {
        xml: ''
      }
    },
    methods: {

    },
    created () {
      document.title = 'Generate Workplaces @ ARLEM Panel'
      workplaceServices.get(this.$routes.params.id, true).then((response) => {
        this.xml = response
      })
    }
  }
</script>
