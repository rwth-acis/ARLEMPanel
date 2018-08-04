<template>
  <div class="md-layout md-gutter" style="margin-bottom:20px">
    <md-table  md-card v-model="items" style="width: 100%;" @md-selected="select">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Point of Intrest</h1>
        </div>
        <div class="md-toolbar-section-end">
          <md-button class="md-fab md-primary md-mini" @click="showDialog = true">
            <md-icon>add</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">Selected {{ selected.length }} POI</div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="remove">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-empty-state
        md-label="No POI found"
        :md-description="`No point of intrests found. Add a new point of interest in this thing form button on top right.`">
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Name" md-numeric>{{ item.name }}</md-table-cell>
        <md-table-cell md-label="X-Offset" md-numeric>{{ item.x }}</md-table-cell>
        <md-table-cell md-label="Y-Offset" md-numeric>{{ item.y }}</md-table-cell>
        <md-table-cell md-label="Z-Offset" md-numeric>{{ item.z }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add POI</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout md-gutter">
          <input-field label="Name" :model.sync="form.name" error="Please enter a name"></input-field>
          <input-field label="X-Offset" type="number" :model.sync="form.x" error="Please enter X-Offset"></input-field>
        </div>
        <div class="md-layout md-gutter">
          <input-field label="Y-Offset" type="number" :model.sync="form.y" error="Please enter Y-Offset"></input-field>
          <input-field label="Z-Offset" type="number" :model.sync="form.z" error="Please enter Z-Offset"></input-field>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="save">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import InputField from 'components/InputField.vue'
  export default {
    props: ['poi'],
    components: {
      'input-field': InputField
    },
    data () {
      return {
        count: 0,
        form: {
          name: '',
          x: 0,
          y: 0,
          z: 0
        },
        showDialog: false,
        selected: []
      }
    },
    computed: {
      items: {
        // getter
        get: function () {
          return this.poi
        },
        // setter
        set: function (newValue) {
          this.$emit('update:poi', newValue)
        }
      }
    },
    methods: {
      save: function () {
        this.items.push({ id: this.count, name: this.form.name, x: this.form.x, y: this.form.y, z: this.form.z })
        this.$emit('add', this.items)
        this.clear()
        this.showDialog = false
        this.count++
      },

      remove: function () {
        for (var item of this.selected) {
          this.items.splice(item.id, 1)
        }
        this.$emit('add', this.items)
      },

      select (item) {
        this.selected = item
      },

      clear () {
        this.form.x = 0
        this.form.y = 0
        this.form.z = 0
      }
    }
  }
</script>
<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
    width: 100%;
  }
</style>
