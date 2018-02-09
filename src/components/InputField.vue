<template>
  <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
    <md-field :class="cssClass">
      <label>{{ label }}</label>
      <md-input :type="inputType" v-model="value" @input="$emit('update:model',value)"></md-input>
      <span class="md-error">{{ error }}</span>
    </md-field>
  </div>
</template>

<script>
  export default {
    props: ['label', 'model', 'error', 'cssClass', 'type'],
    data () {
      return {
        value: '',
        inputType: 'text'
      }
    },
    created () {
      this.value = this.model
      if (this.type) {
        this.inputType = this.type
      }
    }
  }
</script>
