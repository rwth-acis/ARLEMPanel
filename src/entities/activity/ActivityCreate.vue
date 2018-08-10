<template>
  <!-- Entity Create -->
  <div class="md-layout md-gutter main-screen">
    <div class="md-layout-item md-size-20">
      <tile class="tile" text="Activity Details" icon="nature_people" :extraClass="activeTabClass(-1)" v-on:click.native="showActivityBasics()"></tile>
      <h3 style="margin:15px 0;text-align: center">Activity Actions</h3>
        <div class="tile-cover" v-for="(action, index) in actions" :key="index">
          <i class="material-icons close" @click="removeAction(index)">close</i>
          <tile class="tile"  :text="action.name ? action.name : 'Unnamed'" :extraClass="currentAction === index && component !== 'activity-basic'  ? ' md-primary' : action.isValid === false ? 'md-danger' : ''" v-on:click.native="switchAction(index)" showClose="removeAction"></tile>
        </div>
      <tile class="tile" text="Add Action" icon="add" v-on:click.native="addAction()"></tile>
    </div>
    <div class="md-layout-item md-size-70">
      <h1 class="md-display-3" style="margin:15px 0;">Create Activity</h1>
      <keep-alive><component :is="component" @saved="saveActivityBasics"></component></keep-alive>
      <div style="text-align:center" v-if="component !== 'activity-basic'">
        <md-button class="md-raised md-primary" @click="saveActivity(basics, actions)" style="width:250px;height:50px;">Save Activity</md-button>
      </div>
      <div style="clear: both;padding: 50px">&nbsp;</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Tile from 'theme/components/Tile.vue'
  import ActivityBasic from './ActivityCreateBasic.vue'
  import ActionCreate from 'entities/action/ActionCreate.vue'
  import activityServices from './activity.services'

  export default {
    components: {
      'tile': Tile,
      'activity-basic': ActivityBasic,
      'action-create': ActionCreate
    },

    data: function () {
      return {
        component: 'activity-basic'
      }
    },

    computed: {
      ...mapGetters(['actions', 'currentAction', 'basics'])
    },

    created () {
      document.title = 'Create Activities @ ARLEM Panel'
    },

    methods: {
      activeTabClass (index) {
        if (index === -1) {
          console.log(index)
          return this.component === 'activity-basic' ? 'md-primary' : ''
        } else {
          console.log(this.currentAction)
          return this.currentAction === index ? 'md-primary' : ''
        }
      },

      showActivityBasics () {
        this.component = 'activity-basic'
      },

      saveActivityBasics () {
        if (this.actions.length > 0) {
          this.switchAction(0)
        } else {
          this.addAction()
        }
      },

      addAction () {
        this.component = 'action-create'
        this.$store.dispatch('addAction', {
          id: this.actions.length,
          name: '',
          type: 'action',
          instructionTitle: '',
          instructionDescription: '',
          viewport: 0,
          isValid: true,
          triggers: [
            {
              text: 'Enter',
              component: 'action-enter-create',
              operations: [],
              mode: 'enter',
              isValid: true
            },
            {
              text: 'Exit',
              component: 'action-exit-create',
              operations: [],
              mode: 'exit',
              isValid: true
            }
          ]
        })
      },

      switchAction (index) {
        this.$store.dispatch('switchAction', index)
        this.component = 'action-create'
      },

      removeAction (index) {
        this.$store.dispatch('removeAction', index)
        if (this.actions.length === 0) {
          this.component = 'activity-basic'
        }
      },

      activeActionClass (index) {
        return index === this.currentAction && this.component === 'activity-basic' ? 'md-primary' : ''
      },

      saveActivity (_basics, _actions) {
        var actions = []
        for (var i = 0; i < _actions.length; i++) {
          var triggers = []
          for (var j = 0; j < _actions[i].triggers.length; j++) {
            if (_actions[i].triggers[j].operations.length > 0) {
              for (var k = 0; k < _actions[i].triggers[j].operations.length; k++) {
                let operation = JSON.parse(JSON.stringify(_actions[i].triggers[j].operations[k]))

                if (_actions[i].triggers[j].mode !== 'enter' && _actions[i].triggers[j].mode !== 'exit') {
                  _actions[i].triggers[j].operations[k].mode = _actions[i].triggers[j].mode
                  if (_actions[i].triggers[j].mode === 'click') {
                    operation.entityType = 'action'
                  } else if (_actions[i].triggers[j].mode === 'detect') {
                    operation.entityType = 'thing'
                  } else if (_actions[i].triggers[j].mode === 'sensor') {
                    operation.entityType = 'sensor'
                  } else if (_actions[i].triggers[j].mode === 'module') {
                    operation.entityType = 'action'
                  }
                }
                operation.viewportId = operation.viewport
                delete operation.viewport
                triggers.push(operation)
              }
            }
          }
          actions.push({
            name: _actions[i].name,
            type: 'action',
            viewportId: _actions[i].viewport,
            instructionTitle: _actions[i].instructionTitle,
            instructionDescription: _actions[i].instructionDescription,
            triggers: triggers
          })
        }
        _basics.actions = actions
        console.log(JSON.stringify(actions))
        activityServices.post(_basics)
          .then((response) => {
            this.$store.dispatch('showSnackBar', String('Activity has been added successfully.'))
            this.$router.push('/activites')
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tile-cover {
      position: relative;

      .close {
        position: absolute;
        top: 15px;
        right: 5px;
        cursor: pointer;
      }
    }
</style>
