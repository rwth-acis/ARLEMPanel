<template>
  <!-- Workplace Create Mounted -->
  <div>
    <h3 class="md-display-1" style="margin:15px 0;">Create Thing</h3>
    <form novalidate  @submit.prevent="validate">
      <div class="md-layout md-gutter">
        <input-field label="ID" :cssClass="getValidationClass('id')" :model.sync="form.id" error="Please enter the ID"></input-field>
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
      </div>

      <div class="md-layout md-gutter">
        <input-field label="URN" :cssClass="getValidationClass('urn')" :model.sync="form.urn" error="Please enter the URN"></input-field>
        <input-select label="Detectable" :cssClass="getValidationClass('detectable')" :model.sync="form.detectable" error="Please choose a detectable" url="triggers?type=detectable&all=true"></input-select>
      </div>

      <poi-create @add="appendPOI"></poi-create>

      <md-button type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">Save Thing</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import POICreate from './POICreate.vue'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'
  import tangibleServices from './tangible.services'
  export default {
    mixins: [validationMixin],
    props: ['independent'],
    components: {
      'poi-create': POICreate,
      'input-field': InputField,
      'input-select': InputSelect
    },

    mounted () {
      console.log('Workplace Create Mounted')
    },

    methods: {
      appendPOI (items) {
        this.form.pois = items
      },

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
        tangibleServices.postThingCreate(this.form)
          .then((response) => {
            this.$store.dispatch('showSnackBar', String(response.data.message))
            if (this.independent && this.independent === true) {
              this.$router.push('/tangibles')
            } else {
              this.$store.dispatch('addWorkplaceItem', {
                'id': response.object.id,
                'name': response.object.name,
                'type': 'thing'
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
          id: null,
          pois: [],
          detectable: null
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
          id: '',
          name: '',
          detectable: '',
          pois: []
        },
        sending: false,
        showDialog: false
      }
    },

    validations: {
      form: {
        id: {
          required
        },
        name: {
          required
        },
        detectable: {
          required
        }
      }
    }
  }
</script>
