<template>
  <!-- Workplace Create Mounted -->
  <div>
    <h3 class="md-display-3" v-if="independent" style="margin:15px 0;">Create Sensor</h3>
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Add Sensor</h4>
    <form novalidate  @submit.prevent="validate">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
        <input-field label="Type" :cssClass="getValidationClass('type')" :model.sync="form.type" error="Please enter the type"></input-field>
      </div>

      <div class="md-layout md-gutter">
        <input-field label="URI" :cssClass="getValidationClass('url')" :model.sync="form.url" error="Please enter the access URI"></input-field>
      </div>
      <div class="md-layout md-gutter">
        <input-field label="Username" :cssClass="getValidationClass('username')" :model.sync="form.username"></input-field>
        <input-field label="Password" :cssClass="getValidationClass('password')" :model.sync="form.password"></input-field>
      </div>
      <md-button type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">Save Sensor</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'
  import sensorServices from './sensor.services'
  export default {
    mixins: [validationMixin],
    props: ['independent'],
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },

    created () {
      if (this.$route.params.id > 0) {
        sensorServices.get(this.$route.params.id).then(response => {
          this.form = response
        })
        document.title = 'Create Sensors @ ARLEM Panel'
      } else {
        document.title = 'Edit Sensor @ ARLEM Panel'
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
          sensorServices.putUpdate(this.form)
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Sensor has been updated successfully.')
              this.$router.push('/sensors')
            })
        } else {
          sensorServices.postCreate(this.form)
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Sensor has been added successfully.')
              if (this.independent && this.independent === false) {
                this.$store.dispatch('addWorkplaceItem', {
                  'id': response.id,
                  'name': response.name,
                  'type': 'sensor'
                })
              } else {
                this.$router.push('/sensors')
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
          url: null,
          username: null,
          password: null
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
          type: '',
          name: '',
          url: '',
          username: '',
          password: ''
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
        },
        url: {
          required
        }
      }
    }
  }
</script>
