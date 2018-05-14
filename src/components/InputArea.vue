<template>
  <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
    <md-field :class="cssClass">
      <label>{{ label }}</label>
      <md-textarea v-model="value"></md-textarea>
      <span class="md-error">{{ error }}</span>
    </md-field>
  </div>
</template>

<script>
  export default {
    props: ['label', 'model', 'error', 'cssClass', 'type'],
    data () {
      return {
        inputType: 'text'
      }
    },
    computed: {
      value: {
        // getter
        get: function () {
          return this.model
        },
        // setter
        set: function (newValue) {
          this.$emit('update:model', newValue)
        }
      }
    },
    created () {
      if (this.type) {
        this.inputType = this.type
      }
    }
  }
</script>
<style scoped>
  textarea {
    font-size: 16px!important;
  }
</style>
