<template>
  <!-- Tangible Person Create -->
  <div>
    <h3 class="md-display-1" style="margin:15px 0;">Create Action</h3>
    <form novalidate>
      <div class="md-layout md-gutter">
          <input-field label="ID" :model.sync="actions[currentAction].id" error="Please enter a valid ID"></input-field>
          <input-field label="Name" :model.sync="actions[currentAction].name" error="Please enter the name"></input-field>
      </div>       
      <div class="md-layout md-gutter">
          <input-select label="View Port" :model.sync="actions[currentAction].viewport" error="Please choose a workplace" url="viewport/select"></input-select>
          <input-field label="Instruction Title" :model.sync="actions[currentAction].instructionTitle" error="Please enter a valid Instruction Title"></input-field>
      </div>       
      <div class="md-layout md-gutter">
        <input-area label="Instruction Details" :model.sync="actions[currentAction].instructionDescription" error="Please enter a valid Instruction Details"></input-area>
      </div>
      <div>
        <div class="tile-cover" v-for="(tab, index) in actions[currentAction].triggers" :key="index">
          <i class="material-icons close" v-if="index > 1" @click="deleteTile(index)">close</i>
          <tile class="tile" :icon="triggerModeIcons[tab.mode]" :text="tab.text" :extraClass="activeTabClass(currentTrigger, index)" v-on:click.native="changeTab(tab.component, index)"></tile>
        </div>
        <div class="tile-cover">
          <tile class="tile" icon="add" text="Add Trigger" v-on:click.native="addTrigger(actions[currentAction].triggers.length)"></tile>
        </div>
        <div style="clear:both"></div>
        <template v-if="component !== ''">
          <keep-alive><component :is="component"></component></keep-alive>
        </template>
      </div>       
    </form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Tile from 'theme/components/Tile.vue'
  import InputField from 'components/InputField.vue'
  import InputSelect from 'components/InputSelect.vue'
  import EnterCreate from './EnterCreate.vue'
  import ExitCreate from './ExitCreate.vue'
  import TriggerCreate from './TriggerCreate.vue'

  export default {
    components: {
      'input-field': InputField,
      'input-select': InputSelect,
      'tile': Tile,
      'action-enter-create': EnterCreate,
      'action-exit-create': ExitCreate,
      'action-trigger-create': TriggerCreate
    },
    computed: {
      ...mapGetters(['actions', 'currentAction', 'currentTrigger', 'triggerModeIcons'])
    },

    methods: {
      changeTab (_class, index) {
        this.component = _class
        this.$store.dispatch('switchTrigger', index)
      },

      addTrigger (index) {
        this.$store.dispatch('addTrigger')
        this.changeTab('action-trigger-create', index)
      },

      deleteTile (index) {
        this.$store.dispatch('removeTrigger', index)
      },

      activeTabClass (_currentTrigger, _index) {
        if (_currentTrigger === 0) {
          this.component = 'action-enter-create'
        } else if (_currentTrigger === 1) {
          this.component = 'action-exit-create'
        } else {
          this.component = 'action-trigger-create'
        }
        if (_currentTrigger === _index) {
          return 'md-primary'
        } else {
          return ''
        }
      },

      updateDataObject (dataObject) {
        this.form = dataObject
      }

    },

    data: function () {
      return {
        component: 'action-enter-create'
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
  .tile-cover {
    width: 150px;
    float: left;
    margin-right: 10px;
    position: relative;

    .close {
      position: absolute;
      top: 15px;
      right: 5px;
      cursor: pointer;
    }
  }

</style>
