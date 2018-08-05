
<template>
  <!-- Tangible Person Create -->
  <div style="margin-bottom:60px">
    <h4 class="md-display-1" v-if="!independent" style="margin:15px 0;">Workplace Details</h4>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-field label="Name" :cssClass="getValidationClass('name')" :model.sync="form.name" error="Please enter the name"></input-field>
        <!-- <input-select label="Category" :cssClass="getValidationClass('category')" :model.sync="form.category" error="Please choose a detectable" :customItems="categories"></input-select> -->
      </div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-button  v-if="buttonVisible" type="submit" class="md-raised md-primary" style="margin:0" :disabled="sending">Start Adding Items</md-button>
    </form>
  </div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import { required } from 'vuelidate/lib/validators'

  export default {
    props: [
      'independent'
    ],
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

      save: function () {
        this.buttonVisible = false
        this.$emit('saved', this.form)
      },

      clearForm () {
        this.$v.$reset()
        this.form = {
          name: null,
          category: null
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
          name: '',
          category: ''
        },
        sending: false,
        categories: [],
        buttonVisible: true
      }
    },

    validations: {
      form: {
        name: {
          required
        }
        // Removeing category
        /* category: {
          required
        } */
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
