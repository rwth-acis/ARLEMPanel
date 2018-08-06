<template>
  <md-dialog :md-active.sync="showModal">
    <md-dialog-title>Delete {{ entity }}</md-dialog-title>
      <md-dialog-content>
        Are you sure you want to delete this {{ entity }}
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="hideIt">Close</md-button>
        <md-button type="button" @click="deleteIt" class="md-raised md-primary" style="margin:0">Yes</md-button>
      </md-dialog-actions>
  </md-dialog>
</template>
<script>
  export default {
    props: ['entity', 'url', 'entityId', 'showModal'],
    data () {
      return {
        inputType: 'text'
      }
    },
    methods: {
      deleteIt () {
        this.$emit('delete')
      },

      hideIt () {
        this.$emit('hide')
      }
    }
  }
</script>
