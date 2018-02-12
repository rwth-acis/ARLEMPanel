<template>
  <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
    <md-field :class="cssClass">
      <md-select v-model="value" :placeholder="label" @input="$emit('update:model',value)">
        <md-option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</md-option>
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
    created () {
      this.value = this.model
      if (this.url && this.url !== '') {
        axios.get(this.url).then((response) => {
          this.items = response.data.data
        })
      } else {
        this.items = this.customItems
      }
    }
  }
</script>
