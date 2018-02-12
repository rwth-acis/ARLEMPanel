<template>
  <figure class="left">
    <md-card>
      <md-card-header>
        <div class="md-title">
          Forgot Password
        </div>
      </md-card-header>
      <form novalidate  @submit.prevent="validate">
        <md-card-content>
          <div class="md-layout md-gutter">
            <input-field label="Email" :cssClass="getValidationClass('email')" :model.sync="form.email" error="Please enter the email"></input-field>
          </div>
          <a v-on:click='flip("show-front")' class="mdl-color-text--primary">Sign in!</a>
          <a v-on:click='flip("show-bottom")' class="mdl-color-text--primary" style="float: right">Sign up!</a>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary md-full-button">Submit</md-button>
        </md-card-actions>
      </form>
    </md-card>
  </figure>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data: function () {
      return {
        form: {
          email: ''
        }
      }
    },
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },
    methods: {
      flip: function (_class) {
        this.$emit('flip', _class)
      },
      sendForget: function () {
        this.$store.dispatch('forget', this.email).then(() => {
          this.email = ''
          this.$emit('flip', 'show-front')
        })
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      clearForm () {
        this.$v.$reset()
        this.form = {
          email: null
        }
      },

      validate () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.signIn()
        }
      }
    },
    validations: {
      form: {
        email: {
          required
        }
      }
    }
  }
</script>
