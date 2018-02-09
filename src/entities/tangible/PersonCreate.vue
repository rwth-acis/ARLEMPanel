
<template>
  <!-- Tangible Person Create -->
  <div>
    <h3 class="md-display-1" style="margin:15px 0;">New Person</h3>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('name')">
            <label>Name</label>
            <md-input v-model="form.name" type="text" required></md-input>
            <span class="md-error">Please enter the name</span>
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('twitter')">
            <label>Twitter</label>
            <md-input v-model="form.twitter" type="text" required></md-input>
            <span class="md-error">Please enter a valid twitter URL</span>
          </md-field>
        </div>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('email')">
            <label>Email</label>
            <md-input v-model="form.mbox" type="email" required></md-input>
            <span class="md-error">Please enter a valid email</span>
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('detectable')">
            <md-select v-model="form.detectable" placeholder="Detectable">
              <md-option v-for="item in detectables" :key="item.id" :value="item.id">{{ item.name }}</md-option>
            </md-select>
          </md-field>
        </div>
      </div>
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('persona')">
            <label>Persona</label>
            <md-input v-model="form.persona" type="persona" required></md-input>
            <span class="md-error">Please enter a valid persona</span>
          </md-field>
        </div>
      </div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-button type="submit" class="md-raised md-primary" :disabled="sending">Save Person</md-button>
    </form>
  </div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import tangibleServices from './tangible.services'
  import triggerServices from '../trigger/trigger.services'
  // import workplaceModule from 'entities/workplace/workplace.module'
  import {
    required,
    email
    // minLength,
    // maxLength
  } from 'vuelidate/lib/validators'

  export default {
    props: [
      'independent'
    ],
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
        tangibleServices.postPersonCreate(this.form)
          .then((response) => {
            this.$store.dispatch('showSnackBar', String(response.data.message))
            if (this.independent && this.independent === true) {
              this.$router.push('/tangibles')
            } else {
              this.$store.dispatch('addWorkplaceItem', {
                'id': response.object.id,
                'name': response.object.name,
                'type': 'person'
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
          twitter: null,
          persona: null,
          email: null,
          detectable: null
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
          detectable: ''
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
        detectable: {
          required
        },
        mbox: {
          required,
          email
        }
      }
    },

    created () {
      triggerServices.getList({'type': 'detectable'}).then(response => {
        this.detectables = response.data.data
      })
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
