<template>
  <!-- Tangible Person Create -->
  <div>
    <operations mode="exit"></operations>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import InputArea from 'components/InputArea.vue'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import Operations from './Operations.vue'

  export default {
    props: [
      'independent'
    ],

    computed: {
      ...mapGetters(['actions', 'currentAction', 'currentTrigger'])
    },

    components: {
      'input-area': InputArea,
      'input-field': InputField,
      'input-select': InputSelect,
      'operations': Operations
    },

    data: function () {
      return {
        removeSelf: 0,
        yesno: [
          {id: 0, 'name': 'No'},
          {id: 1, 'name': 'Yes'}
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
