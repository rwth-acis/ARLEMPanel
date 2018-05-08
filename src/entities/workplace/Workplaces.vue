<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Workplaces" description="Workplaces are the main part of ARLME Panel" buttonText="Create Workplace" buttonUrl="/workplace/create"></page-header>
        <entity-tab entity="Workplaces"></entity-tab>
        <md-table v-model="searched" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort"  md-card @md-selected="onSelect">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Workplaces</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>
        <md-table-empty-state
            md-label="No workplace found"
            :md-description="`No workplace found for this '${search}' query. Try a different search term or create a new Workplace.`">
          <md-button class="md-primary md-raised" @click="newLink">Create New Workplace</md-button>
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
  import workplaceServices from 'services/workplace.services.js'
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
        // alert('transfer');
        this.$router.push('/workplace/create')
      }
    },
    created () {
      document.title = 'Workplaces @ ARLEM Panel'
      workplaceServices.getList({}).then(response => {
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
