<template>
  <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
    <md-field :class="cssClass">
      <md-select v-model="value" :placeholder="label">
        <md-option value="">Choose {{ label }}</md-option>
        <md-option v-for="(item, index) in items" :key="index" :value="item.id">{{ (item.name === '' ? 'Unnamed' : item.name) | capitalize }}</md-option>
      </md-select>
      <span class="md-error">{{ error }}</span>
    </md-field>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: ['label', 'model', 'error', 'cssClass', 'customItems', 'url'],
    data () {
      return {
        items: [],
        value: ''
      }
    },
    watch: {
      url: function (newVal, oldVal) {
        if (newVal && newVal !== '') {
          axios.get(newVal).then((response) => {
            this.items = response.data
          })
        }
      },
      model: function (newVal, oldVal) {
        this.value = this.model
      },
      value: function (newVal, oldVal) {
        if (this.value === null) {
          this.value = ''
        }
        this.$emit('update:model', this.value)
      }
    },
    created () {
      this.value = this.model
      if (this.url && this.url !== '') {
        axios.get(this.url).then((response) => {
          this.items = response.data
        })
      } else {
        this.items = this.customItems
      }
    }
  }
</script>
