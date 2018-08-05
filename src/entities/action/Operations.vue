<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-50">
          <input-select label="Remove Self" :model.sync="form.removeSelf" :customItems="yesno"></input-select>
      </div>
    </div>

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
        <md-table-cell md-label="Operation">{{ item.operation == 'activate' ? 'Activate' : 'Deactivate' }}</md-table-cell>
        <md-table-cell md-label="Type">{{ item.entityType }}</md-table-cell>
        <md-table-cell md-label="Entity">{{ item.entityId }}</md-table-cell>
        <md-table-cell md-label="Predicate">{{ item.primitiveId }}</md-table-cell>
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
            <input-select label="Activate / Deactivate" :cssClass="getValidationClass('operation')" :model.sync="form.operation" :customItems="activateDeactivate"></input-select>
            <input-select label="Type" :cssClass="getValidationClass('entityType')" :model.sync="form.entityType" :customItems="operationType"></input-select>
          </div>
          <teplate v-if="form.entityType === 'Person' || form.entityType === 'Place' || form.entityType === 'Thing'">
            <div class="md-layout md-gutter">
              <input-select label="Entity" :cssClass="getValidationClass('entityId')" :model.sync="form.entityId" :url="entitySelectUrl"></input-select>
              <input-select label="Viewport" :cssClass="getValidationClass('viewportId')" :model.sync="form.viewportId" url="viewport"></input-select>
            </div>
            <div class="md-layout md-gutter">
              <input-select label="Predicate" :cssClass="getValidationClass('primitiveId')" :model.sync="form.primitiveId" url="trigger/primitive"></input-select>
              <input-field label="POI" :cssClass="getValidationClass('poi')" :model.sync="form.poi"></input-field>
            </div>
            <div class="md-layout md-gutter">
              <input-field label="Options" :cssClass="getValidationClass('option')" :model.sync="form.option"></input-field>
            </div>
          </teplate>
          <teplate v-if="form.entityType === 'Action'">
            <div class="md-layout md-gutter">
              <input-select label="Entity" :cssClass="getValidationClass('entityId')" :model.sync="form.entityId" :customItems="actions"></input-select>
              <input-select label="Viewport" :cssClass="getValidationClass('viewport')" :model.sync="form.viewport" url="viewport"></input-select>
            </div>
          </teplate>
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
    props: ['mode', 'remove'],
    computed: {
      ...mapGetters(['currentOperations', 'actions']),
      entitySelectUrl () {
        return 'entity/' + this.form.entityType
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
          mode: this.mode,
          removeSelf: null,
          operation: null,
          entityType: null,
          entityId: null,
          primitiveId: null,
          poi: null,
          option: null,
          viewportId: null
        }
      }
    },

    data: function () {
      return {
        showAddModal: false,
        form: {
          mode: this.mode,
          removeSelf: null,
          operation: null,
          entityType: null,
          entityId: null,
          primitiveId: null,
          poi: null,
          option: null,
          viewportId: null
        },
        yesno: [
          {id: 0, 'name': 'No'},
          {id: 1, 'name': 'Yes'}
        ],
        activateDeactivate: [
          {id: 'n', name: 'Deactivate'},
          {id: 'y', name: 'Activate'}
        ],
        operationType: [
          {id: 'thing', name: 'Thing'},
          {id: 'person', name: 'Person'},
          {id: 'place', name: 'Place'},
          {id: 'action', name: 'Action'}
        ],
        sending: false
      }
    },

    validations: {
      form: {
        operation: {
          required
        },
        entityType: {
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
