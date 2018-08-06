
<template>
  <!-- Tangible Person Create -->
  <div>
    <h3 class="md-display-3" v-if="independent" style="margin:15px 0;">Create Person</h3>
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Add Person</h4>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
        <input-field label="Twitter" :cssClass="getValidationClass('twitter')" :model.sync="form.twitter" error="Please enter a valid twitter ID"></input-field>
      </div>
      <div class="md-layout md-gutter">
        <input-field label="Email" type="email" :cssClass="getValidationClass('mbox')" :model.sync="form.mbox" error="Please enter a valid email"></input-field>
        <input-select label="Detectable" :cssClass="getValidationClass('detectableId')" :model.sync="form.detectableId" error="Please choose a detectable" url="trigger/detectable"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-field label="Persona" :cssClass="getValidationClass('persona')" :model.sync="form.persona" error="Please enter a valid persona"></input-field>
      </div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-button type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">Save Person</md-button>
    </form>
  </div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import tangibleServices from './tangible.services'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  // import workplaceModule from 'entities/workplace/workplace.module'
  import {
    required,
    email
    // minLength,
    // maxLength
  } from 'vuelidate/lib/validators'

  export default {
    props: ['independent'],
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },
    mixins: [validationMixin],
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      savePerson: function () {
        this.sending = true
        if (this.form.id > 0) {
          tangibleServices.putPersonUpdate(this.form)
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Person has been updated successfully.')
              this.$router.push('/tangibles')
            })
        } else {
          tangibleServices.postPersonCreate(this.form)
            .then((response) => {
              this.$store.dispatch('showSnackBar', 'Person has been created successfully.')
              if (this.independent && this.independent === true) {
                this.$router.push('/tangibles')
              } else {
                this.$store.dispatch('addWorkplaceItem', {
                  'id': response.id,
                  'name': response.name,
                  'type': 'person'
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
          twitter: null,
          persona: null,
          mbox: null,
          detectableId: null
        }
      },

      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.savePerson()
        }
      }
    },

    data: function () {
      return {
        form: {
          name: '',
          twitter: '',
          persona: '',
          mbox: '',
          detectableId: ''
        },
        sending: false,
        detectables: []
      }
    },

    validations: {
      form: {
        name: {
          required
        },
        twitter: {
          required
        },
        detectableId: {
          required
        },
        mbox: {
          required,
          email
        }
      }
    },

    created () {
      if (this.$route.params.id > 0) {
        tangibleServices.get('person', this.$route.params.id).then(response => {
          this.form = response
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
