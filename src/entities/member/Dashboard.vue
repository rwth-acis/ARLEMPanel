<template>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <page-header style="margin-bottom: 40px;" title="Dashboard" description="An overview of everything present in ARLEM Panel"></page-header>
        <div class="md-layout md-gutter">
          <md-card class="md-layout-item md-primary">
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Workplaces</div>
                <div class="md-subhead">Everything that is present in the environment of system under consideration</div>
              </md-card-header-text>

              <md-card-media md-medium>
                <p class="md-display-4" style="text-align: right">{{ workplaces }}</p>
              </md-card-media>
            </md-card-header>
          </md-card>
          <md-card class="md-layout-item md-accent">
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Activites</div>
                <div class="md-subhead">All the activites that can be performed in the order to achieve a goal</div>
              </md-card-header-text>

              <md-card-media md-medium>
                <p class="md-display-4" style="text-align: right">{{ activities }}</p>
              </md-card-media>
            </md-card-header>
          </md-card>
          <md-card class="md-layout-item">
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Entities</div>
                <div class="md-subhead">All the entities like triggers, tangibles, configurables and sensors</div>
              </md-card-header-text>

              <md-card-media md-medium>
                <p class="md-display-4">{{ entities }}</p>
              </md-card-media>
            </md-card-header>

          </md-card>
        </div>
      </div>
    </div>
</template>
<script>
  import Header from 'theme/components/Header.vue'
  import memberServices from './member.services'
  export default {
    data () {
      return {
        workplaces: 0,
        activities: 0,
        entities: 0
      }
    },
    components: {
      'page-header': Header
    },
    methods: {

    },
    created () {
      memberServices.getDashboard().then((response) => {
        this.workplaces = response.workplaces
        this.activities = response.activities
        this.entities = response.entities
      })
      document.title = 'Dashboard @ ARLEM Panel'
    }
  }
</script>
<style scoped>
  .md-display-4 {
    margin: 0;
  }
</style>


