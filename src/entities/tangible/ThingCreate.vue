<template>
  <!-- Workplace Create Mounted -->
  <div>
    <h3 class="md-display-1" style="margin:15px 0;">New Thing</h3>
    <form novalidate  @submit.prevent="validate">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('id')">
            <label>ID</label>
            <md-input v-model="form.id" type="text" required></md-input>
            <span class="md-error">Please enter an ID</span>
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('name')">
            <label>Name</label>
            <md-input v-model="form.name" type="text" required></md-input>
            <span class="md-error">Please enter the name</span>
          </md-field>
        </div>
      </div>

      <div class="md-layout md-gutter">
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('name')">
            <label>URN</label>
            <md-input v-model="form.name" type="text" required></md-input>
            <span class="md-error">Please enter the a URM</span>
          </md-field>
        </div>
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
          <md-field :class="getValidationClass('detectable')">
            <md-select v-model="form.category" placeholder="Detectable">
              <md-option value="australia">Australia</md-option>
              <md-option value="brazil">Brazil</md-option>
              <md-option value="japan">Japan</md-option>
              <md-option value="united-states">United States</md-option>
            </md-select>
            <span class="md-error">Please choose the a Detectable</span>
          </md-field>
        </div>
      </div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-button type="submit" class="md-raised md-primary" :disabled="sending">Save Thing</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required
    // email,
    // minLength,
    // maxLength
  } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],
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
        // swal("Good job!", "You clicked the button!", "success");
        this.sending = false
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
          category: ''
        },
        sending: false
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
        category: {
          required
        }
      }
    }
  }
</script>
