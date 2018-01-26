<template>
  <!-- Tile -->
  <md-content :class="extraClass">
    <i class="material-icons">{{ icon }}</i>
    {{ text }}
  </md-content>
</template>

<script>
  export default {
    props: ['icon', 'text', 'extraClass'],
    mounted () {
    }
  }
</script>

<style scoped>
  .md-content {
    min-height: auto;
    min-width: auto;
    text-align: center;
    font-size: 1em;
    width: auto;
    height: auto;
    padding: 1em;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    border: 1px solid #efefef;
    cursor:pointer;
    margin: 1em 0;
    text-align:center;
  }
  .md-content:hover, .md-content.md-primary {
    box-shadow: 0 0px 0px 0 rgba(0,0,0,.14);
  }
  .material-icons {
    font-size: 4em;
    display:block;
  }
</style>
