<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-select label="Mode" :model.sync="actions[currentAction].triggers[currentTrigger].mode" url="action/trigger/mode/select"></input-select>
      </div>
      <operations :mode="actions[currentAction].triggers[currentTrigger].mode"></operations>
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

    methods: {
      showType (mode) {
        if (mode === 'click') {
          return true
        }
      }
    },

    data: function () {
      return {
        yesno: [
          {id: 0, 'name': 'No'},
          {id: 1, 'name': 'Yes'}
        ],
        operationType: [
          {id: 'place', name: 'Place'},
          {id: 'person', name: 'Person'},
          {id: 'thing', name: 'Thing'},
          {id: 'module', name: 'Module'}
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
