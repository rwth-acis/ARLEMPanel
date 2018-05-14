<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <operations></operations>
      <div class="md-layout md-gutter">
        <input-select label="Mode" :model.sync="actions[currentAction].triggers[currentTrigger].mode" :customItems="yesno"></input-select>
        <input-select label="Type" :model.sync="actions[currentAction].triggers[currentTrigger].type" :customItems="yesno"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-select label="Action" :model.sync="actions[currentAction].triggers[currentTrigger].action" :customItems="yesno"></input-select>
        <input-select label="Viewport" :model.sync="actions[currentAction].triggers[currentTrigger].viewport" :customItems="yesno"></input-select>
      </div>
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
