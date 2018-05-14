<template>
  <!-- Entity Create -->
  <div class="md-layout md-gutter main-screen">
    <div class="md-layout-item md-size-20">
      <tile class="tile" text="Activity Details" icon="nature_people" :extraClass="activeTabClass(-1)" v-on:click.native="showActivityBasics()"></tile>
      <h3 style="margin:15px 0;text-align: center">Activity Actions</h3>
        <div class="tile-cover" v-for="(action, index) in actions" :key="index">
          <i class="material-icons close" @click="removeAction(index)">close</i>
          <tile class="tile"  :text="action.id ? action.id : 'Unnamed'" :extraClass="currentAction === index ? 'md-primary' : ''" v-on:click.native="switchAction(index)" showClose="removeAction"></tile>
        </div>
      <tile class="tile" text="Add Action" icon="add" v-on:click.native="addAction()"></tile>
    </div>
    <div class="md-layout-item md-size-70">
      <h1 class="md-display-3" style="margin:15px 0;">Create Activity</h1>
      <keep-alive><component :is="component"></component></keep-alive>
      <div style="text-align:center">
        <md-button class="md-raised md-primary" @click="saveActivity(actions)" style="width:250px;height:50px;">Save Activity</md-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Tile from 'theme/components/Tile.vue'
  import ActivityBasic from './ActivityCreateBasic.vue'
  import ActionCreate from 'entities/action/ActionCreate.vue'
  
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
      ...mapGetters(['actions', 'currentAction'])
    },

    created () {
      document.title = 'Create Workplaces @ ARLEM Panel'
    },

    methods: {
      activeTabClass (index) {
        if (index === -1) {
          return this.component === 'activity-basic' ? 'md-primary' : ''
        } else {
          return this.currentAction === index ? 'md-primary' : ''
        }
      },

      showActivityBasics () {
        this.component = 'activity-basic'
      },

      addAction () {
        this.component = 'action-create'
        this.$store.dispatch('addAction', {
          triggers: [
            {
              icon: 'arrow_forward_ios',
              text: 'Enter',
              component: 'action-enter-create',
              category: 'action',
              operations: []
            },
            {
              icon: 'arrow_back_ios',
              text: 'Exit',
              component: 'action-exit-create',
              category: 'action',
              operations: []
            }
          ]
        })
      },

      switchAction (index) {
        this.$store.dispatch('switchAction', index)
      },

      removeAction (index) {
        this.$store.dispatch('removeAction', index)
      },

      activeActionClass (index) {
        return index === this.currentAction && this.component === 'activity-basic' ? 'md-primary' : ''
      },

      saveActivity (_actions) {
        console.log(_actions)
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
