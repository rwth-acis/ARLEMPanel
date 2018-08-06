<template>
  <div class="md-layout md-gutter header">
    <div class="md-layout-item md-size-50">
      <img src="http://localhost:8080/images/logo_small.png" style="float:left" />
      <main-search style="float:left"></main-search>
    </div>
    <div class="md-layout-item">
      <ul class="nav">
        <li><router-link :to="{ name: 'member.dashboard' }">Dashboard</router-link></li>
        <li>
          <router-link :to="{ name: 'workplace.list' }">Workplaces</router-link>
          <ul>
            <li><router-link :to="{ name: 'tangible.list' }">Tangibles</router-link></li>
            <li><router-link :to="{ name: 'configurable.list' }">Configurables</router-link></li>
            <li><router-link :to="{ name: 'trigger.list' }">Triggers</router-link></li>
            <li><router-link :to="{ name: 'sensor.list' }">Sensors</router-link></li>
          </ul>
        </li>
        <li><router-link :to="{ name: 'activity.list' }">Activities</router-link></li>
        <li>
          <span>Account</span>
          <ul>
            <li><router-link :to="{ name: 'member.settings' }">Settings</router-link></li>
            <li><a @click="signOut()">SignOut</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import MainSearch from '../components/MainSearch.vue'
  export default {
    components: {
      'main-search': MainSearch
    },
    methods: {
      signOut: function () {
        this.$store.dispatch('signOut').then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../sass/variables';
  img {
    height: 56px!important;
    padding: 0px;
    padding-right: 30px;
    border-right: 1px solid rgba(255, 255, 255, 0.4);
    margin: 10px;
  }

.nav {
  a,span {
    text-decoration: none;
  }
  > a {
    display: inline-block;
    padding: 1em 18px;
    cursor: pointer;
    position: relative;
    color: white!important;
    text-decoration: none;
    &:hover {
      color: $font-color;
      background: rgba(white,0.4);
    }
  }

  > li

    ul {
      position: absolute;
      left: 0;
      top: 100%;
      transform-origin: 0 0;
      box-shadow: 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12), 0 3px 5px -1px rgba(0,0,0,.2);
      background: white;
      padding: 0;
      z-index: 100;

      li {
        display: block;
        width: 100%;

        a {
          width: 100%;
          padding: 1em 18px;
          display: inline-block;
          white-space: pre;
          box-sizing: border-box;
          color: $font-color;
          &:hover {
            background: $brand-primary;
            color: white!important;
            text-decoration: none!important;
          }
        }
      }
    }
  }
</style>

