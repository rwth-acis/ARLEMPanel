<template>
  <!-- Tangible Person Create -->
  <div>
    <operations mode="enter"></operations>
  </div>
</template>
<script>
  import Operations from './Operations.vue'

  export default {
    components: {
      'operations': Operations
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
