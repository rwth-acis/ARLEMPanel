<template>
  <div style="margin: 12px;">
    <md-button v-for="tab in tabs" :class="activeTabClass(tab.text)" :key="tab.text"><router-link :to="{ name: tab.url }">{{ tab.text }}</router-link></md-button>
  </div>
</template>
<script>
  export default {
    props: ['entity'],
    data: function () {
      return {
        tabs: [
          {
            text: 'Workplaces',
            url: 'workplace.list'
          },
          {
            text: 'Tangibles',
            url: 'tangible.list'
          },
          {
            text: 'Configurables',
            url: 'configurable.list'
          },
          {
            text: 'Triggers',
            url: 'trigger.list'
          },
          {
            text: 'Sensors',
            url: 'sensor.list'
          }
        ]
      }
    },
    methods: {
      activeTabClass: function (_class) {
        if (this.entity === _class) {
          return 'md-primary md-raised'
        } else {
          return 'md-raised'
        }
      }
    }
  }
</script>
<style scoped>
a:hover {
  text-decoration: none;
}
.md-primary a, .md-primary a:hover {
  color: white;
}
</style>
