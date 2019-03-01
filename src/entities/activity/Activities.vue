<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Activites" description="Activities are the main part of ARLME Panel" buttonText="Create Activity" buttonUrl="activity.create"></page-header>
        <div style="clear: both;padding: 20px">&nbsp;</div>
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
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Author" md-sort-by="author">{{ item.author.name }}</md-table-cell>
          <md-table-cell md-label="Workplace" md-sort-by="workplace">{{ item.workplace.name }}</md-table-cell>
          <md-table-cell md-label="Created" md-sort-by="created_at">{{ item.createdAt | moment("MMMM Do YYYY") }}</md-table-cell>
          <md-table-cell md-label="Action">
            <md-button @click="generate(item.id)" class="md-icon-button md-raised">
              <md-icon>code</md-icon>
            </md-button>
            <template v-if="user == item.author.id">
              <md-button @click="deleteOperation(item.id)" class="md-icon-button md-raised">
                <md-icon>delete</md-icon>
              </md-button>
            </template>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <pagination :totalPage="total" @btnClick="changePage" style="float:right;margin-right: 20px;"></pagination>
      <div style="clear: both;padding: 50px">&nbsp;</div>
      </div>
      <delete-dialog entity="Activity" @delete="deleteIt" @hide="hideDialog" :showModal="showDeleteDialog"></delete-dialog>
    </div>
</template>
<script>
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import Header from 'theme/components/Header.vue'
  import activityServices from './activity.services'
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
        showDialog: false,
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
        this.$router.push({ name: 'activity.create' })
      },
      loadData () {
        activityServices.getList({page: this.page}).then(response => {
          this.searched = response.docs
          this.total = response.pages
        })
      },
      deleteOperation (id) {
        this.entityId = id
        this.showDeleteDialog = true
      },
      deleteIt () {
        activityServices.delete(this.entityId).then(response => {
          this.$store.dispatch('showSnackBar', String('Activity has added deleted successfully.'))
          this.hideDialog()
          this.loadData()
        })
      },
      hideDialog () {
        this.showDeleteDialog = false
      },
      generate (id) {
        this.$router.push({ name: 'activity.generate', params: {id} })
      }
    },
    created () {
      document.title = 'Activities @ ARLEM Panel'
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
