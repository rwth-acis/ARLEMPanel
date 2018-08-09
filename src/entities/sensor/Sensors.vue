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
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="URL">{{ item.url }}</md-table-cell>
          <md-table-cell md-label="Username">{{ item.username }}</md-table-cell>
          <md-table-cell md-label="Author">{{ item.author.name }}</md-table-cell>
          <md-table-cell md-label="Created">{{ item.createdAt | moment("MMMM Do YYYY") }}</md-table-cell>
          <md-table-cell md-label="Action">
            <template v-if="user == item.author.id">
              <md-button @click="$router.push('/sensor/edit/' + item.id)" class="md-icon-button md-raised">
                <md-icon>edit</md-icon>
              </md-button>
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
  import sensorServices from './sensor.services.js'
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
        entityId: 0
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
        this.$router.push('/sensor/create')
      },
      loadData () {
        sensorServices.getList({page: this.page}).then(response => {
          this.searched = response.docs
          this.total = response.pages
        })
      },
      deleteOperation (id) {
        this.entityId = id
        this.showDeleteDialog = true
      },
      deleteIt () {
        sensorServices.delete(this.entityId).then(response => {
          this.$store.dispatch('showSnackBar', String('Sensor has added deleted successfully.'))
          this.hideDialog()
          this.loadData()
        })
      },
      hideDialog () {
        this.showDeleteDialog = false
      }
    },
    created () {
      document.title = 'Sensors @ ARLEM Panel'
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
