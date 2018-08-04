<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Sensors" description="Sensors are the physical objects present within the workplace. These objects are used / required to complete the activity." buttonText="Create Sensor" buttonUrl="/sensor/create"></page-header>
        <entity-tab entity="Sensors"></entity-tab>
        <md-table v-model="searched" md-card>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Sensors</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>
        <md-table-empty-state
            md-label="No sensors found"
            :md-description="`Try a different search term or create a new Sensor.`">
          <md-button class="md-primary md-raised" @click="newLink">Create New Sensor</md-button>
        </md-table-empty-state>
        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
          <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="URL">{{ item.url }}</md-table-cell>
          <md-table-cell md-label="Username">{{ item.username }}</md-table-cell>
          <md-table-cell md-label="Author">{{ item.author.name }}</md-table-cell>
          <md-table-cell md-label="Created">{{ item.createdAt | moment("MMMM Do YYYY") }}</md-table-cell>
          <md-table-cell md-label="Action">
            <md-icon>edit</md-icon>
          </md-table-cell>
        </md-table-row>
      </md-table>
      </div>
    </div>
</template>
<script>
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import Header from 'theme/components/Header.vue'
  import sensorServices from './sensor.services.js'
  export default {
    components: {
      'entity-tab': EntityTabs,
      'page-header': Header
    },
    data: function () {
      return {
        search: null,
        searched: [],
        currentSort: 'name',
        currentSortOrder: 'asc',
        selected: [],
        headers: []
      }
    },
    methods: {
      onSelect (items) {
        this.selected = items
      },
      getAlternateLabel (count) {
        let plural = ''
        if (count > 1) {
          plural = 's'
        }
        return `${count} user${plural} selected`
      },
      customSort (value) {
        return value.sort((a, b) => {
          const sortBy = this.currentSort
          if (this.currentSortOrder === 'desc') {
            return a[sortBy].localeCompare(b[sortBy])
          }
          return b[sortBy].localeCompare(a[sortBy])
        })
      },
      searchOnTable () {
        this.searched = ''
      },
      newLink () {
        this.$router.push('/sensor/create')
      }
    },
    created () {
      sensorServices.getList({}).then(response => {
        this.searched = response
      })
    }
  }
</script>
<style lang="scss" scoped>
  .md-field {
    max-width: 900px;
  }
</style>
