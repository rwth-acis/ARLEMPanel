<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header title="Workplaces" description="Workplaces are the main part of ARLME Panel" buttonText="Create Workplace" buttonUrl="/workplace/create"></page-header>
        <entity-tab entity="Workplaces"></entity-tab>
        <md-table v-model="searched" md-card>
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
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Author" md-sort-by="author">{{ item.author.name }}</md-table-cell>
            <md-table-cell md-label="Created" md-sort-by="created_at">{{ item.createdAt | moment("MMMM Do YYYY") }}</md-table-cell>
            <md-table-cell md-label="Action">
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
      <delete-dialog entity="Workplace" @delete="deleteWorkplace" @hide="hideDialog" :showModal="showDeleteDialog"></delete-dialog>
    </div>
</template>
<script>
  import EntityTabs from 'theme/components/EntityTabs.vue'
  import Header from 'theme/components/Header.vue'
  import workplaceServices from './workplace.services.js'
  import Pagination from 'vue-paginate-al'
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
        entityId: 0
      }
    },
    methods: {
      changePage (_page) {
        this.page = _page
        this.loadData()
      },
      getAlternateLabel (count) {
        let plural = ''
        if (count > 1) {
          plural = 's'
        }
        return `${count} user${plural} selected`
      },
      searchOnTable () {
        this.searched = ''
      },
      newLink () {
        // alert('transfer');
        this.$router.push('/workplace/create')
      },
      loadData () {
        workplaceServices.getList({page: this.page}).then(response => {
          this.searched = response.docs
          this.total = response.pages
        })
      },
      deleteOperation (id) {
        this.entityId = id
        this.showDeleteDialog = true
      },
      deleteWorkplace () {
        workplaceServices.delete(this.entityId).then(response => {
          this.$store.dispatch('showSnackBar', String('Workplace has added deleted successfully.'))
          this.hideDialog()
          this.loadData()
        })
      },
      hideDialog () {
        this.showDeleteDialog = false
      }
    },
    created () {
      document.title = 'Workplaces @ ARLEM Panel'
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
