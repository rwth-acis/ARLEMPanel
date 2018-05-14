<template>
  <div>
    <md-table v-model="currentOperations" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title" style="float:left">Activations & Deactivations</h1>
          <md-button style="float:right" class="md-primary md-raised" @click="newOperation">Add</md-button>
          <div style="clear:both"></div>
        </div>
      </md-table-toolbar>
      <md-table-empty-state md-label="No Operations added"></md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Operation">{{ item.action == 'y' ? 'Activate' : 'Deactivate' }}</md-table-cell>
        <md-table-cell md-label="Type">{{ item.type }}</md-table-cell>
        <md-table-cell md-label="Entity">{{ item.entity }}</md-table-cell>
        <md-table-cell md-label="Predicate">{{ item.predicate }}</md-table-cell>
        <md-table-cell md-label="Action" v-on:click.native="removeOperation">
          <md-icon>delete</md-icon>
        </md-table-cell>
      </md-table-row>
    </md-table>  
    <md-dialog :md-active.sync="showAddModal">
      <md-dialog-title>Preferences</md-dialog-title>
      <md-dialog-content> 
        <form novalidate  @submit.prevent="validateUser">
          <div class="md-layout md-gutter">
            <input-select label="Activate / Deactivate" :cssClass="getValidationClass('action')" :model.sync="form.action" :customItems="activateDeactivate"></input-select>
            <input-select label="Type" :cssClass="getValidationClass('type')" :model.sync="form.type" :customItems="operationType"></input-select>
          </div>
          <div :class="'md-layout md-gutter' + (form.type !== null && form.type !== '' && form.type !== 'action' ? '' : ' hidden')">
            <input-select label="Entity" :cssClass="getValidationClass('entity')" :model.sync="form.entity" :url="entitySelectUrl"></input-select>
            <input-select label="Predicate" :cssClass="getValidationClass('predicate')" :model.sync="form.predicate" :customItems="operationType"></input-select>
          </div>
          <div :class="'md-layout md-gutter' + (form.type !== null && form.type !== '' && form.type !== 'action' ? '' : ' hidden')">
            <input-select label="POI" :cssClass="getValidationClass('poi')" :model.sync="form.poi" :customItems="activateDeactivate"></input-select>
            <input-field label="Options" :cssClass="getValidationClass('option')" :model.sync="form.option"></input-field>
          </div>
          <div :class="'md-layout md-gutter' + (form.type === 'action' ? '' : ' hidden')">
            <input-select label="Action" :cssClass="getValidationClass('entity')" :model.sync="form.action" url="action/select"></input-select>
            <input-field label="Viewport" :cssClass="getValidationClass('viewport')" :model.sync="form.viewport"></input-field>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddModal = false">Close</md-button>
        <md-button type="button" @click="validateUser" class="md-raised md-primary" style="margin:0">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>

</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { mapGetters } from 'vuex'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },
    computed: {
      ...mapGetters(['currentOperations']),
      entitySelectUrl () {
        return 'tangible/' + this.form.type + '/select'
      }
    },
    methods: {
      onSelect () {

      },

      newOperation () {
        this.showAddModal = true
      },

      getAlternateLabel (count) {
        let plural = ''
        if (count > 1) {
          plural = 's'
        }
        return `${count} user${plural} selected`
      },

      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      validateUser: function () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.showAddModal = false
          this.$store.dispatch('addOperation', this.form)
          this.clearForm()
        }
      },

      removeOperation (index) {
        this.$store.dispatch('removeOperation', index)
      },

      clearForm () {
        this.$v.$reset()
        this.form = {
          action: null,
          type: null,
          entity: null,
          predicate: null,
          poi: null,
          options: null,
          viewport: null
        }
      }
    },

    data: function () {
      return {
        showAddModal: false,
        form: {
          action: null,
          type: null,
          entity: null,
          predicate: null,
          poi: null,
          options: null,
          viewport: null
        },
        activateDeactivate: [
          {id: 'n', name: 'Deactivate'},
          {id: 'y', name: 'Activate'}
        ],
        operationType: [
          {id: 'place', name: 'Place'},
          {id: 'person', name: 'Person'},
          {id: 'thing', name: 'Thing'},
          {id: 'action', name: 'Action'}
        ],
        sending: false
      }
    },

    validations: {
      form: {
        action: {
          required
        },
        type: {
          required
        }
      }
    }
  }
</script>
<style scoped>
  .md-card {
    margin-left: 0!important;
    margin-right: 0!important;
  }
</style>
