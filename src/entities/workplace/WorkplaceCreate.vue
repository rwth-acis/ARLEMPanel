<template>
  <!-- Entity Create -->
  <div class="md-layout md-gutter main-screen">
    <div class="md-layout-item md-size-20" style="position: relative; height: 100%; overflow-y: auto;padding-bottom: 60px;">
      <tabs :component="tab" :display="display" @changeTab="tabChange"></tabs>
    </div>
    <div class="md-layout-item md-size-50">
      <h2 class="md-display-2">Create Workplace</h2>
      <workplace-create @saved="savedWorkplace"></workplace-create>
      <template v-if="component !== ''">
        <keep-alive><component :is="component" :independent="false"></component></keep-alive>
      </template>
      <div style="text-align:center">
        <md-button class="md-raised md-primary" @click="saveWorkplace" style="width:250px;height:50px;">Save Workplace</md-button>
      </div>
    </div>
    <div class="md-layout-item md-size-30 selected-entities">
      <h2 class="md-display-1">Added Entities</h2>

        <md-autocomplete md-layout="box" v-model="value" :md-options="countries" @md-changed="getCountries" @md-opened="getCountries" @md-selected="addWorkplaceItem">
          <label>Search Entities</label>
          <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}<br /><small>{{ item.type }}</small></template>
          <template slot="md-autocomplete-empty" slot-scope="{ term }">No entities found. </template>
        </md-autocomplete>
        <md-list>
          <md-list-item v-for="(item, index) in items" :key="item.id">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-70">
                <span class="md-list-item-text">{{ item.type }}</span>
                <h6 class="md-title">{{ item.name }}</h6>
              </div>
              <div class="md-layout-item md-size-30">
                <md-button @click="removeWorkplaceItem(index)" class="md-fab md-mini">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>
          </md-list-item>
        </md-list>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Tabs from 'theme/components/Tabs.vue'
  import TabComponents from 'theme/components/TabComponents.vue'

  import WorkplaceCreate from './WorkplaceCreateBasic.vue'

  import PersonCreate from 'entities/tangible/PersonCreate.vue'
  import PlaceCreate from 'entities/tangible/PlaceCreate.vue'
  import ThingCreate from 'entities/tangible/ThingCreate.vue'

  import DetectableCreate from 'entities/trigger/DetectableCreate.vue'
  import PredicateCreate from 'entities/trigger/PredicateCreate.vue'
  import WarningCreate from 'entities/trigger/WarningCreate.vue'
  import HazardCreate from 'entities/trigger/HazardCreate.vue'

  import AppCreate from 'entities/configurable/AppCreate.vue'
  import DeviceCreate from 'entities/configurable/DeviceCreate.vue'

  import SensorCreate from 'entities/sensor/SensorCreateWorkplace.vue'

  import workplaceServices from './workplace.services.js'

  export default {
    components: {
      'tabs': Tabs,
      'tab-contents': TabComponents,
      'workplace-create': WorkplaceCreate,
      'person-create': PersonCreate,
      'place-create': PlaceCreate,
      'thing-create': ThingCreate,
      'detectable-create': DetectableCreate,
      'predicate-create': PredicateCreate,
      'warning-create': WarningCreate,
      'hazard-create': HazardCreate,
      'app-create': AppCreate,
      'device-create': DeviceCreate,
      'sensor-create': SensorCreate
    },

    data: function () {
      return {
        workplace: {name: null, category: null},
        display: 'all',
        component: '',
        tab: 'workplace-create',
        value: null,
        countryList: [],
        countries: []
      }
    },
    computed: {
      ...mapGetters(['items'])
    },
    methods: {
      getCountries (searchTerm) {
        this.countries = []
        if (searchTerm && searchTerm !== '') {
          workplaceServices.getEntityList(searchTerm).then(response => {
            if (response.length && response.length > 0) {
              this.countries = response
            }
          })
        }
      },

      tabChange: function (_component) {
        this.tab = _component
        if (_component !== 'workplace-create') {
          this.component = _component
        } else {
          this.component = ''
        }
      },
      saveWorkplace () {
        workplaceServices.postCreate({
          name: this.workplace.name,
          category: this.workplace.category,
          items: this.items
        })
          .then((response) => {
            this.$store.dispatch('showSnackBar', String('Workplace has added created successfully.'))
            this.$router.push({ name: 'trigger.create' })
            this.items = []
            this.$store.dispatch('cleanWorkplaceItems')
          })
      },
      savedWorkplace: function (_entity) {
        this.workplace = _entity
        this.component = this.tab = 'person-create'
      },
      parseComponent: function (route) {
        if (route === 'workplace-create') {
          this.component = 'workplace-create'
          this.display = 'all'
        } else if (route === 'tangible-create') {
          this.component = 'person-create'
          this.display = 'tangible'
        } else if (route === 'trigger-create') {
          this.component = 'predicate-create'
          this.display = 'trigger'
        } else if (route === 'configurable-create') {
          this.component = 'app-create'
          this.display = 'configurable'
        } else if (route === 'sensor-create') {
          this.component = 'sensor-create'
          this.display = 'sensor'
        }
      },
      addWorkplaceItem (Item) {
        this.value = ''
        this.$store.dispatch('addWorkplaceItem', {
          'id': Item.id,
          'name': Item.name,
          'type': Item.type
        })
      },
      removeWorkplaceItem (index) {
        this.$store.dispatch('removeWorkplaceItem', index)
      }
    },
    created () {
      document.title = 'Create Workplaces @ ARLEM Panel'
    }
  }
</script>
<style lang="scss" scoped>
  .md-list-item {
      height: 50px;
  }
  h6 {
    margin: 0;
  }
  .md-display-1 {
    margin-bottom: 0;
  }
  .selected-entities {
    background: #efefef;
  }
  .main-screen {
    margin-top: -16px;
  }
</style>
