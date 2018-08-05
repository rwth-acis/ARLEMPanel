<template>
  <div>
    <template v-for='tab in tabs'>
      <h4 v-if="tab.icon == '' && display == 'all'" :key="tab.text">{{ tab.text }}</h4>
      <tile v-if="tab.icon != '' && (display == 'all' || display == tab.category)" :icon="tab.icon" :text="tab.text" :key="tab.text" :extraClass="activeTabClass(tab.component)" v-on:click.native="changeTab(tab.component)"></tile>
    </template>
  </div>
</template>
<script>
  import Tile from './Tile.vue'
  export default {
    props: ['component', 'display'],
    components: {
      'tile': Tile
    },
    data: function () {
      return {
        tabs: [
          {
            icon: 'home',
            text: 'Workplace Details',
            component: 'workplace-create',
            category: 'workplace'
          },
          {
            icon: '',
            text: 'Tangibles',
            component: ''
          },
          {
            icon: 'perm_identity',
            text: 'Add Person',
            component: 'person-create',
            category: 'tangible'
          },
          {
            icon: 'motorcycle',
            text: 'Add Thing',
            component: 'thing-create',
            category: 'tangible'
          },
          {
            icon: 'place',
            text: 'Add Place',
            component: 'place-create',
            category: 'tangible'
          },
          {
            icon: '',
            text: 'Configurables',
            component: ''
          },
          {
            icon: 'apps',
            text: 'Add App',
            component: 'app-create',
            category: 'configurable'
          },
          {
            icon: 'smartphone',
            text: 'Add Device',
            component: 'device-create',
            category: 'configurable'
          },
          {
            icon: '',
            text: 'Triggers',
            component: ''
          },
          {
            icon: 'lightbulb_outline',
            text: 'Add Predicate',
            component: 'predicate-create',
            category: 'trigger'
          },
          {
            icon: 'warning',
            text: 'Add Warning',
            component: 'warning-create',
            category: 'trigger'
          },
          {
            icon: 'block',
            text: 'Add Hazard',
            component: 'hazard-create',
            category: 'trigger'
          },
          {
            icon: 'settings_remote',
            text: 'Add Detectable',
            component: 'detectable-create',
            category: 'trigger'
          },
          {
            icon: '',
            text: 'Sensors',
            component: ''
          },
          {
            icon: 'fingerprint',
            text: 'Add Sensor',
            component: 'sensor-create',
            category: 'sensor'
          }
        ]
      }
    },
    methods: {
      changeTab: function (_component) {
        this.$emit('changeTab', _component)
      },
      activeTabClass: function (_class) {
        if (this.component === _class) {
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
