<template>
    <!-- Search -->
    <div class="search-panel">
        <form action="#">
            <input type="text" placeholder="Search" size="1">
            <i class="material-icons">search</i>
        </form>
    </div>
</template>

<script>
  export default {
    mounted () {
      console.log('Main Search box mounted.')
    }
  }
</script>

<style lang="scss" scoped>

    .search-panel {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        min-width: 350px;
        max-width: 500px;
        position: relative;
        margin-left: 25px;
        margin-top: 10px;
    }

    .search-panel input {
        width: 100%;
        outline: none;
        border: none;
        padding: 15px 15px 15px 45px;
        margin-top: 6px;
        border-radius: 2px;
        background: rgba(255,255,255,0.4);
    }

    .search-panel .material-icons {
        position: absolute;
        left: 10px;
        top: 15px;
        color:    #FFFFFF;
    }

    .search-panel input::-webkit-input-placeholder { /* WebKit browsers */
        color:    #FFFFFF;
    }

    .search-panel input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #FFFFFF;
        opacity:  1; /* Firefox gives the placeholder a reduced opacity so we have to increase it */
    }

    .search-panel input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #FFFFFF;
        opacity:  1; /* Firefox gives the placeholder a reduced opacity so we have to increase it */
    }

    .search-panel input:focus {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2);
        background: #fff;
        color: #252b2a;
    }

    .search-panel input:focus + .material-icons {
        color: #252b2a;
    }
</style>
