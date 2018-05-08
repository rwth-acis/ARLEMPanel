<template>
  <figure class="front">
    <md-card>
      <md-card-header>
        <div class="md-title">
          Sign In
        </div>
      </md-card-header>
      <form novalidate  @submit.prevent="validate">
        <md-card-content>
          <div class="md-layout md-gutter">
            <input-field label="Email" :cssClass="getValidationClass('email')" :model.sync="form.email" error="Please enter the email"></input-field>
          </div>
          <div class="md-layout md-gutter">
            <input-field label="Password" :cssClass="getValidationClass('password')" type="password" :model.sync="form.password" error="Please enter the password"></input-field>
          </div>
          <a v-on:click='flip("show-bottom")' class="mdl-color-text--primary">Sign up!</a>
          <a v-on:click='flip("show-left")' class="mdl-color-text--primary" style="float: right">Lost Password?</a>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary md-full-button">Submit</md-button>
        </md-card-actions>
      </form>
    </md-card>
  </figure>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data: function () {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    components: {
      'input-field': InputField,
      'input-select': InputSelect
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      flip: function (_class) {
        this.$emit('flip', _class)
      },
      signIn: function () {
        this.$store.dispatch('signIn', this.form).then(() => {
          this.email = ''
          this.password = ''
          this.$router.push('/dashboard')
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
          email: null,
          password: null
        }
      },

      validate () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.signIn()
        }
      }
    },
    mounted () {
      document.title = 'ARLEM Panel'
      if (this.isAuthenticated === true) {
        this.$router.push('/dashboard')
      }
    },
    validations: {
      form: {
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

