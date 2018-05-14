
<template>
  <!-- Tangible Person Create -->
  <div style="margin-bottom:60px">
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Basic Details</h4>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-field label="Name" :model.sync="basics.name" error="Please enter the name"></input-field>
        <input-select label="Workplace" :model.sync="basics.workplace" error="Please choose a workplace" url="workplace/select"></input-select>
        <input-select label="Language" :model.sync="basics.language" error="Please choose a language" :customItems="languages"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-area label="Description" :model.sync="basics.description" error="Please enter a valid Description"></input-area>
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
        this.buttonText = 'Update'
        this.$emit('saved', this.form)
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
        }
      }
    },

    created () {
      this.categories = [
        {id: 1, 'name': 'Category One'},
        {id: 2, 'name': 'Category Two'},
        {id: 3, 'name': 'Category Three'},
        {id: 4, 'name': 'Category Four'}
      ]
    }

  }
</script>
