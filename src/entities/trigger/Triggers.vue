<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Triggers" description="Triggers are the physical objects present within the workplace. These objects are used / required to complete the activity." buttonText="Create Trigger" buttonUrl="trigger.create"></page-header>
        <entity-tab entity="Triggers"></entity-tab>
        <md-table v-model="searched" md-card>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Triggers</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>
        <md-table-empty-state
            md-label="No triggers found"
            :md-description="`Try a different search term or create a new Trigger.`">
          <md-button class="md-primary md-raised" @click="newLink">Create New Trigger</md-button>
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
          <md-table-cell md-label="Name" md-sort-by="type">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Category" md-sort-by="type">{{ item.category }}</md-table-cell>
          <md-table-cell md-label="Type" md-sort-by="type">{{ item.type }}</md-table-cell>
          <md-table-cell md-label="Author" md-sort-by="author">{{ item.author.name }}</md-table-cell>
          <md-table-cell md-label="Created" md-sort-by="created">{{ item.createdAt | moment("MMMM Do YYYY") }}</md-table-cell>
          <md-table-cell md-label="Action">
            <template v-if="user == item.author.id">
              <md-button @click="$router.push({ name: 'trigger.update', params: {type: item.category, id: item.id} })" class="md-icon-button md-raised">
                <md-icon>edit</md-icon>
              </md-button>
              <md-button @click="deleteOperation(item.id, item.category)" class="md-icon-button md-raised">
                <md-icon>delete</md-icon>
              </md-button>
            </template>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination :totalPage="total" @btnClick="changePage" style="float:right;margin-right: 20px;"></pagination>
      <div style="clear: both;padding: 50px">&nbsp;</div>
      </div>
      <delete-dialog entity="Trigger" @delete="deleteIt" @hide="hideDialog" :showModal="showDeleteDialog"></delete-dialog>
    </div>
</template>
<script>
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import Header from 'theme/components/Header.vue'
  import triggerServices from './trigger.services.js'
  import Pagination from 'vue-paginate-ml'
  import DeleteDialog from 'components/DeleteDialog.vue'
  export default {
    components: {
      'entity-tab': EntityTabs,
      'page-header': Header,
      'pagination': Pagination,
      'delete-dialog': DeleteDialog
    },
    data: function () {
      return {
        search: null,
        searched: [],
        currentSort: 'name',
        currentSortOrder: 'asc',
        selected: [],
        headers: [],
        page: 1,
        total: 0,
        user: 0,
        showDeleteDialog: false,
        entityId: 0,
        entityType: ''
      }
    },
    methods: {
      changePage (_page) {
        this.page = _page
        this.loadData()
      },
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
        this.$router.push({ name: 'trigger.create' })
      },
      loadData () {
        triggerServices.getList({page: this.page}).then(response => {
          this.searched = response.docs
          this.total = response.pages
        })
      },
      deleteOperation (id, type) {
        this.entityId = id
        this.entityType = type
        this.showDeleteDialog = true
      },
      deleteIt () {
        triggerServices.delete(this.entityId, this.entityType).then(response => {
          this.$store.dispatch('showSnackBar', String('Trigger has added deleted successfully.'))
          this.hideDialog()
          this.loadData()
        })
      },
      hideDialog () {
        this.showDeleteDialog = false
      }
    },
    created () {
      document.title = 'Triggers @ ARLEM Panel'
      this.loadData()
      this.user = window.localStorage.getItem('user')
    }
  }
</script>
<style lang="scss" scoped>
  .md-field {
    max-width: 900px;
  }
</style>
