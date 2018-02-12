<template>
  <!-- Workplace Create Mounted -->
  <div>
    <h3 class="md-display-1" style="margin:15px 0;">Create Device</h3>
    <form novalidate  @submit.prevent="validate">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
        <input-select label="Type" :cssClass="getValidationClass('type')" :model.sync="form.type" error="Please choose a device type" url="configurable/device/types"></input-select>
      </div>
      <md-button type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">Save Device</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'
  import configurableServices from './configurable.services'
  export default {
    mixins: [validationMixin],
    props: ['independent'],
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },

    mounted () {
      console.log('Workplace Create Mounted')
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
        configurableServices.postDeviceCreate(this.form)
          .then((response) => {
            this.$store.dispatch('showSnackBar', String(response.data.message))
            if (this.independent && this.independent === true) {
              this.$router.push('/configurables')
            } else {
              this.$store.dispatch('addWorkplaceItem', {
                'id': response.object.id,
                'name': response.object.name,
                'type': 'device'
              })
            }
            this.sending = false
            this.clearForm()
          })
      },

      clearForm () {
        this.$v.$reset()
        this.form = {
          name: null,
          type: null
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
          type: ''
        },
        sending: false,
        showDialog: false
      }
    },

    validations: {
      form: {
        name: {
          required
        },
        type: {
          required
        }
      }
    }
  }
</script>
