<template>
  <!-- Tangible Person Create -->
  <div>
    <form novalidate  @submit.prevent="validateUser">
      <div class="md-layout md-gutter">
        <input-select label="Mode" :model.sync="form.mode" :customItems="modes"></input-select>
        <teplate v-if="form.mode === 'click'">
          <div class="md-layout md-gutter">
            <input-select label="Action" :cssClass="getValidationClass('entityId')" :model.sync="form.entityId" :customItems="actions"></input-select>
            <input-select label="Viewport" :cssClass="getValidationClass('viewport')" :model.sync="form.viewport" url="viewport"></input-select>
          </div>
        </teplate>
        <teplate v-if="form.mode === 'detect'">
          <div class="md-layout md-gutter">
            <input-select label="Tangible" :cssClass="getValidationClass('entityId')" :model.sync="form.entityId" :customItems="tangible/thing"></input-select>
            <input-select label="Viewport" :cssClass="getValidationClass('viewport')" :model.sync="form.viewport" url="viewport"></input-select>
          </div>
        </teplate>
        <teplate v-if="form.mode === 'sensor'">
          <div class="md-layout md-gutter">
            <input-select label="Sensor" :cssClass="getValidationClass('entityId')" :model.sync="form.entityId" :customItems="sensor/select"></input-select>
            <input-field label="Value" :cssClass="getValidationClass('value')" :model.sync="form.value"></input-field>
          </div>
        </teplate>
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
