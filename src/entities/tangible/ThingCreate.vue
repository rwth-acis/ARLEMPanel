<template>
  <!-- Workplace Create Mounted -->
  <div>
    <h3 class="md-display-3" v-if="independent" style="margin:15px 0;">Create Thing</h3>
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Add Thing</h4>
    <form novalidate  @submit.prevent="validate">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
      </div>

      <div class="md-layout md-gutter">
        <input-field label="URN" :cssClass="getValidationClass('urn')" :model.sync="form.urn" error="Please enter the URN"></input-field>
        <input-select label="Detectable" :cssClass="getValidationClass('detectableId')" :model.sync="form.detectableId" error="Please choose a detectable" url="trigger/detectable"></input-select>
      </div>

      <poi-create @add="appendPOI" :poi.sync="form.pois"></poi-create>

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

    created () {
      if (this.$route.params.id > 0) {
        tangibleServices.get('thing', this.$route.params.id).then(response => {
          this.form = response
        })
      }
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
        if (this.form.id > 0) {
          tangibleServices.putThingUpdate(this.form)
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Thing has been updated successfully.')
              this.$router.push({ name: 'tangible.list' })
            })
        } else {
          tangibleServices.postThingCreate(this.form)
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Thing has been created successfully.')
              if (this.independent && this.independent === true) {
                this.$router.push({ name: 'tangible.list' })
              } else {
                this.$store.dispatch('addWorkplaceItem', {
                  'id': response.id,
                  'name': response.name,
                  'type': 'thing'
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
          pois: [],
          detectableId: null
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
          detectableId: '',
          pois: []
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
        detectableId: {
          required
        }
      }
    }
  }
</script>
