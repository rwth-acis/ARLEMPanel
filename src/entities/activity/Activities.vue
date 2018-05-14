<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Activites" description="Activities are the main part of ARLME Panel" buttonText="Create Activity" buttonUrl="/activity/create"></page-header>
        <entity-tab entity="Activites"></entity-tab>
        <md-table v-model="searched" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort"  md-card @md-selected="onSelect">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Activites</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>
        <md-table-empty-state
            md-label="No activity found"
            :md-description="`No activity found for this '${search}' query. Try a different search term or create a new Activity.`">
          <md-button class="md-primary md-raised" @click="newLink">Create New Activity</md-button>
        </md-table-empty-state>
        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
          <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
          <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Author" md-sort-by="author">{{ item.author.name }}</md-table-cell>
          <md-table-cell md-label="Workplace" md-sort-by="workplace">{{ item.workplace.name }}</md-table-cell>
          <md-table-cell md-label="Created" md-sort-by="created_at">{{ item.created_at }}</md-table-cell>
          <md-table-cell md-label="Action">
            <md-icon>edit</md-icon>
            <md-icon>delete</md-icon>
          </md-table-cell>
        </md-table-row>
      </md-table>
      </div>      
    </div>
</template>
<script>
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import Header from 'theme/components/Header.vue'
  import activityServices from './activity.services'
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
        headers: [],
        showDialog: false
      }
    },
    methods: {
      onSelect (items) {
        this.selected = items
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
        this.$router.push('/activity/create')
      }
    },
    created () {
      document.title = 'Activities @ ARLEM Panel'
      activityServices.getList({}).then(response => {
        for (var key in response.data.data[0]) {
          console.log(key)
        }
        this.searched = response.data.data
      })
    }
  }
</script>
<style lang="scss" scoped>
  .md-field {
    max-width: 900px;
  }
</style>
