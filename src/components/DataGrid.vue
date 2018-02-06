<template>
  <div>
    <md-table v-model="searched" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort"  md-card @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">{{ model }}</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
          md-label="No ${model} found"
          :md-description="`No ${model} found for this '${search}' query. Try a different search term or create a new ${model}.`">
        <md-button class="md-primary md-raised" @click="newLink">Create New {{ model }}</md-button>
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
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import workplaceServices from 'services/workplace.services.js'
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
  }

  export default {
    props: ['url', 'model', 'createLink'],
    data: function () {
      return {
        search: null,
        searched: [],
        currentSort: 'name',
        currentSortOrder: 'asc',
        selected: [],
        users: [
          {
            id: 1,
            name: 'Shawna Dubbin',
            email: 'sdubbin0@geocities.com',
            gender: 'Male',
            title: 'Assistant Media Planner'
          },
          {
            id: 2,
            name: 'Odette Demageard',
            email: 'odemageard1@spotify.com',
            gender: 'Female',
            title: 'Account Coordinator'
          },
          {
            id: 3,
            name: 'Lonnie Izkovitz',
            email: 'lizkovitz3@youtu.be',
            gender: 'Female',
            title: 'Operator'
          },
          {
            id: 4,
            name: 'Thatcher Stave',
            email: 'tstave4@reference.com',
            gender: 'Male',
            title: 'Software Test Engineer III'
          },
          {
            id: 5,
            name: 'Clarinda Marieton',
            email: 'cmarietonh@theatlantic.com',
            gender: 'Female',
            title: 'Paralegal'
          },
          {
            id: 1,
            name: 'Shawna Dubbin',
            email: 'sdubbin0@geocities.com',
            gender: 'Male',
            title: 'Assistant Media Planner'
          },
          {
            id: 2,
            name: 'Odette Demageard',
            email: 'odemageard1@spotify.com',
            gender: 'Female',
            title: 'Account Coordinator'
          },
          {
            id: 3,
            name: 'Lonnie Izkovitz',
            email: 'lizkovitz3@youtu.be',
            gender: 'Female',
            title: 'Operator'
          },
          {
            id: 4,
            name: 'Thatcher Stave',
            email: 'tstave4@reference.com',
            gender: 'Male',
            title: 'Software Test Engineer III'
          },
          {
            id: 5,
            name: 'Clarinda Marieton',
            email: 'cmarietonh@theatlantic.com',
            gender: 'Female',
            title: 'Paralegal'
          }
        ]
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
        this.searched = searchByName(this.users, this.search)
      },
      newLink () {
        // alert('transfer');
      }
    },
    created () {
      workplaceServices.getList({}).then(response => {
        console.log(response)
        // this.searched = this.users
      })
    }
  }
</script>

<style lang="scss" scoped>
  .md-field {
    max-width: 300px;
  }
</style>
