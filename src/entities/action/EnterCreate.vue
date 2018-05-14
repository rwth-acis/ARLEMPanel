<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-50">
          <input-select label="Remove Self" :model.sync="actions[currentAction].triggers[currentTrigger].remove" :customItems="yesno"></input-select>
        </div>
      </div>      
      <operations></operations>
    </form>
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
