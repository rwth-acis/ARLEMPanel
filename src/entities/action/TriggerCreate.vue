<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-select label="Mode" :model.sync="actions[currentAction].triggers[currentTrigger].mode" url="action/trigger/mode/select"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-select v-if="actions[currentAction].triggers[currentTrigger].mode == '3'" label="Action" :model.sync="actions[currentAction].triggers[currentTrigger].entity" url="action/select"></input-select>
        <input-select v-if="actions[currentAction].triggers[currentTrigger].mode == '3'" label="Viewport" :model.sync="actions[currentAction].triggers[currentTrigger].viewport"  url="viewport/select"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-select v-if="actions[currentAction].triggers[currentTrigger].mode == '4'" label="Type" :model.sync="actions[currentAction].triggers[currentTrigger].type" :customItems="operationType"></input-select>
        <input-field  v-if="actions[currentAction].triggers[currentTrigger].mode == '4'" label="Options" :model.sync="actions[currentAction].triggers[currentTrigger].options"></input-field>
        <input-select v-if="actions[currentAction].triggers[currentTrigger].mode == '4'" label="Entity" :model.sync="actions[currentAction].triggers[currentTrigger].entity" :url="'/tangible/' + actions[currentAction].triggers[currentTrigger].type + '/select'"></input-select>
      </div>
      <div class="md-layout md-gutter">
        <input-select v-if="actions[currentAction].triggers[currentTrigger].mode == '5'" label="Sensor" :model.sync="actions[currentAction].triggers[currentTrigger].entity" :url="'sensor/select'"></input-select>
        <input-field  v-if="actions[currentAction].triggers[currentTrigger].mode == '5'" label="Options" :model.sync="actions[currentAction].triggers[currentTrigger].options"></input-field>
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
