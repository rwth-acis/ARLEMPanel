
<template>
  <!-- Tangible Person Create -->
  <div style="margin-bottom:60px">
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Basic Details</h4>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
        <input-select label="Workplace" :cssClass="getValidationClass('workplace')" :model.sync="form.workplace" error="Please choose a workplace" url="workplace/?select=true"></input-select>
        <input-select label="Language" :cssClass="getValidationClass('language')" :model.sync="form.language" error="Please choose a language" :customItems="languages"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-area label="Description" :cssClass="getValidationClass('description')" :model.sync="form.description" error="Please enter a valid Description"></input-area>
      </div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-button type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">{{ buttonText }}</md-button>
    </form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import InputArea from 'components/InputArea.vue'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'

  export default {
    props: [
      'independent'
    ],

    computed: {
      ...mapGetters(['basics'])
    },

    components: {
      'input-area': InputArea,
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

      save: function () {
        this.$store.dispatch('saveBasics', this.form)
        this.buttonText = 'Update'
        this.$emit('saved')
      },

      clearForm () {
        this.$v.$reset()
        this.form = {
          name: null,
          workplace: null,
          language: null,
          description: null
        }
      },

      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.save()
          return true
        } else {
          return false
        }
      }
    },

    data: function () {
      return {
        form: {
          name: null,
          workplace: null,
          language: null,
          description: null
        },
        sending: false,
        languages: [
          {id: 'en', 'name': 'English'},
          {id: 'de', 'name': 'German'}
        ],
        workplaces: [],
        buttonText: 'Start Adding Actions'
      }
    },

    validations: {
      form: {
        name: {
          required
        },
        workplace: {
          required
        },
        language: {
          required
        },
        description: {
          required
        }
      }
    }
  }
</script>
