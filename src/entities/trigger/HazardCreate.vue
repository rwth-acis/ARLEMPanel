<template>
  <!-- Workplace Create Mounted -->
  <div>
    <h3 class="md-display-3" v-if="independent" style="margin:15px 0;">Create Hazard</h3>
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Add Hazard</h4>
    <form novalidate  @submit.prevent="validate">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
        <input-field label="Type" :cssClass="getValidationClass('type')" :model.sync="form.type" error="Please enter the type"></input-field>
      </div>
      <div class="md-layout md-gutter">
        <input-field label="Size" type="number" :cssClass="getValidationClass('size')" :model.sync="form.size"></input-field>
        <input-field label="Symbol" :cssClass="getValidationClass('symbol')" :model.sync="form.symbol"></input-field>
      </div>
      <md-button type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">Save Hazard</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'
  import triggerServices from './trigger.services'
  export default {
    mixins: [validationMixin],
    props: ['independent'],
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },

    created () {
      if (this.$route.params.id > 0) {
        triggerServices.get('primitive', this.$route.params.id).then(response => {
          this.form = response
        })
      }
    },

    methods: {

      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      save: function () {
        this.sending = true
        if (this.form.id > 0) {
          triggerServices.putPredicateUpdate(this.form, 'hazard')
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Hazard has been updated successfully.')
              this.$router.push('/triggers')
            })
        } else {
          triggerServices.postPredicateCreate(this.form, 'hazard')
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Hazard has been added successfully.')
              if (this.independent && this.independent === true) {
                this.$router.push('/triggers')
              } else {
                this.$store.dispatch('addWorkplaceItem', {
                  'id': response.id,
                  'name': response.name,
                  'type': 'hazard'
                })
              }
              this.sending = false
              this.clearForm()
            })
        }
      },

      clearForm () {
        this.$v.$reset()
        this.form = {
          name: null,
          type: null,
          size: null,
          symbol: null,
          url: null,
          option: null
        }
      },

      validate () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.save()
        }
      }
    },

    data: function () {
      return {
        form: {
          name: '',
          type: '',
          size: '',
          symbol: '',
          url: '',
          option: ''
        },
        sending: false,
        showDialog: false
      }
    },

    validations: {
      form: {
        type: {
          required
        },
        name: {
          required
        }
      }
    }
  }
</script>
