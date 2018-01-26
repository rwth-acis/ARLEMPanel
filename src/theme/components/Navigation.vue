<template>
  <div class="md-layout md-gutter header">
    <div class="md-layout-item md-size-50">
      <img src="http://127.0.0.1:8000/images/logo_small.png" style="float:left" />
      <main-search style="float:left"></main-search>
    </div>
    <div class="md-layout-item">
      <ul class="nav">
        <li><a href="/dashboard">Dashboard</a></li>
        <li>
          <a href="/workplaces">Workplaces</a>
          <ul>
            <li><a href="/tangibles">Tangibles</a></li>
            <li><a href="/configurables">Configurables</a></li>
            <li><a href="/triggers">Triggers</a></li>
            <li><a href="/sensors">Sensors</a></li>
          </ul>
        </li>
        <li><a href="/activities">Activities</a></li>
        <li><a href="#">Learners</a></li>
        <li>
          <span>Account</span>
          <ul>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Setting</a></li>
            <li><a href="/logout">Logout</a></li>
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
  > li {
    display: inline-block;
    padding: 1em 18px;
    cursor: pointer;
    position: relative;
    color: white;

    & > a {
      color: #fff!important;

      &:hover {
        text-decoration: none;
      }
    }

    ul {
      position: absolute;
      left: 0;
      top: 100%;
      transition: all 0.3s ease;
      transform: scale(0);
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

    &:hover {
      color: $font-color;
      background: rgba(white,0.4);

      ul {
        transform: scale(1);
      }
    }
  }
}
</style>

