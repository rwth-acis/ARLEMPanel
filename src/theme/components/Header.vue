<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <h1 class="md-display-4">{{ current.model }}</h1>
            <h3 class="md-display-1">{{ current.description }}</h3>
        </div>
        <div class="md-layout-item md-size-25">
            <a :href="current.button.url" class="md-elevation-17 big-button">{{ current.button.text }}</a>
        </div>
    </div>
</template>

<script>
    // import router from 'vue-router'
    export default {
      data: function () {
        return {
          current: {
            model: '',
            description: '',
            button: {
              url: '',
              text: ''
            }
          },
          headers: {
            'workplace.list.get': {
              model: 'Workplaces',
              description: 'A workplace refers to the specific physical environment and context in which users are learning using tangible real-world objects together with virtual objects.',
              button: {
                url: 'workplaces/create',
                text: 'Create Workplace'
              }
            }
          }
        }
      },
      mounted () {
        this.current = this.headers[this.$router.currentRoute.name]
      }
    }
</script>

<style scoped>
    .md-display-4 {
        display:block
    }
    .md-display-1 {
        margin-top:0;
        margin-bottom:30px;
        white-space: inherit;
    }
    .md-layout-item {
        position:relative;
    }
</style>
