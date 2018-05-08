<template>
  <figure class="bottom">
    <md-card>
      <md-card-header>
        <div class="md-title">
          Sign Up
        </div>
      </md-card-header>
      <form novalidate  @submit.prevent="validate">
        <md-card-content>
          <div class="md-layout md-gutter">
            <input-field label="Name" :model.sync="form.name" error="Please enter the name"></input-field>
          </div>
          <div class="md-layout md-gutter">
            <input-field label="Email" :model.sync="form.email" error="Please enter the email"></input-field>
          </div>
          <div class="md-layout md-gutter">
            <input-field label="Password" type="password" :model.sync="form.password" error="Please enter the password"></input-field>
          </div>
          <a v-on:click='flip("show-front")' class="mdl-color-text--primary">Sign in!</a>

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
          name: '',
          email: '',
          password: ''
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
      signUp: function () {
        this.$store.dispatch('signUp', this.form).then(() => {
          this.clearForm()
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
          name: null,
          email: null,
          password: null
        }
      },

      validate () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.signUp()
        }
      }
    },
    mounted () {
      console.log('Sign Up.')
    },
    validations: {
      form: {
        name: {
          required
        },
        email: {
          required
        },
        password: {
          required
        }
      }
    }
  }
</script>
<style scoped>
.md-card-header {
    background: var(--md-theme-default-primary);
    color: white;
}
</style>

