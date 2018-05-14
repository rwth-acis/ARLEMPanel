<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <operations></operations>
      <div class="md-layout md-gutter">
        <input-select label="Remove Self" :model.sync="actions[currentAction].triggers[currentTrigger].remove" :customItems="yesno"></input-select>
        <input-field label="Instruction Title" :model.sync="actions[currentAction].triggers[currentTrigger].title" error="Please enter a valid Instruction Title"></input-field>
      </div>
      <div class="md-layout md-gutter">
        <input-area label="Instruction Details" :model.sync="actions[currentAction].triggers[currentTrigger].details" error="Please enter a valid Instruction Details"></input-area>
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
