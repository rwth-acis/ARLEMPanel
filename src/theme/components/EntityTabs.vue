<template>
  <div>
    <md-button v-for="tab in tabs" href="/tangibles" :class="activeTabClass(tab.url)">{{ tab.text }}</md-button>
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
            url: 'workplaces'
          },
          {
            text: 'Tangibles',
            url: 'tangibles'
          },
          {
            text: 'Configurables',
            url: 'configurables'
          },
          {
            text: 'Triggers',
            url: 'triggers'
          },
          {
            text: 'Sensors',
            url: 'sensors'
          }
        ]
      }
    },
    methods: {
      activeTabClass: function (_class) {
        if (this.entity === _class) {
          return 'md-primary'
        } else {
          return ''
        }
      }
    },
    mounted () {
      console.log('Sign Up.')
    }
  }
</script>
