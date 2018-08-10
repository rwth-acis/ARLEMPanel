<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-select label="Mode" @change="updateTrigger" :model.sync="actions[currentAction].triggers[currentTrigger].mode" :customItems="modes"></input-select>
        <template v-if="actions[currentAction].triggers[currentTrigger].mode === 'click'">
          <input-select label="Action" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].entityId" :customItems="actions"></input-select>
          <input-select label="Viewport" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].viewport" url="viewport"></input-select>
        </template>
        <template v-if="actions[currentAction].triggers[currentTrigger].mode === 'detect'">
          <input-select label="Tangible" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].entityId" url="tangible/thing"></input-select>
          <input-select label="Viewport" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].viewport" url="viewport"></input-select>
        </template>
        <template v-if="actions[currentAction].triggers[currentTrigger].mode === 'sensor'">
          <input-select label="Sensor" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].entityId" url="sensor/select"></input-select>
          <input-field label="Value" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].value"></input-field>
        </template>
        <template v-if="actions[currentAction].triggers[currentTrigger].mode === 'module'">
          <input-select label="Module" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].entityId" url="module"></input-select>
          <input-field label="Value" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].value"></input-field>
        </template>
      </div>
        <template v-if="actions[currentAction].triggers[currentTrigger].mode === 'module'">
          <div class="md-layout md-gutter">
            <input-select label="Action" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].entityId" :customItems="actions"></input-select>
            <input-select label="Viewport" :model.sync="actions[currentAction].triggers[currentTrigger].operations[0].viewport" url="viewport"></input-select>
          </div>
        </template>
      <md-button type="submit" class="md-raised md-primary" style="margin:0">Save Trigger</md-button>
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
      },
      getValidationClass (fieldName) {

      },
      updateTrigger () {

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
        ],
        modes: [
          {id: 'click', name: 'click'},
          {id: 'detect', name: 'detect'},
          {id: 'sensor', name: 'sensor'},
          {id: 'module', name: 'module'}
        ],
        form: {
          mode: null,
          removeSelf: null,
          operation: null,
          entityType: null,
          entityId: null,
          primitiveId: null,
          poi: null,
          option: null,
          viewportId: null
        }
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
