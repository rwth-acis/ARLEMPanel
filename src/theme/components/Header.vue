<template>
  <div class="md-layout md-gutter md-primary">
    <div class="md-layout-item">
      <h1 class="md-display-4">{{ title }}</h1>
      <h3 class="md-display-1">{{ description }}</h3>
    </div>
    <div v-if="buttonText" class="md-layout-item md-size-25">
      <router-link :to="buttonUrl" class="md-elevation-17 big-button">{{ buttonText }}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'description', 'buttonUrl', 'buttonText'],
    mounted () {

    }
  }
</script>

<style scoped>
  .md-primary {
    background:var(--md-theme-default-primary);
    margin-top: -16px;
    margin-left: -18px;
    margin-right: -18px;
    padding: 20px;
  }

  .md-display-4 {
    display:block;
    margin: 0;
    color: white;
    font-size: 60px;
    display: block;
    line-height: 1em;
  }
  .md-display-1 {
    color: white;
    margin-top:0;
    margin-bottom:30px;
    white-space: inherit;
  }
  .md-layout-item {
    position:relative;
    padding: 0;
  }
</style>
