<template>
  <div>
    <img src="http://localhost:8000/images/logo.png" class="logo" />
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <section class="container">
          <div id="cube" :class="pageClass">
            <sign-in v-on:flip='flipCard'></sign-in>
            <sign-up v-on:flip='flipCard'></sign-up>
            <forget-password v-on:flip='flipCard'></forget-password>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  import SignInForm from './SignInForm.vue'
  import SignUpForm from './SignUpForm.vue'
  import ForgetForm from './ForgetForm.vue'
  export default {
    data: function () {
      return {
        pageClass: 'show-front'
      }
    },
    components: {
      'sign-in': SignInForm,
      'sign-up': SignUpForm,
      'forget-password': ForgetForm
    },
    methods: {
      flipCard: function (_class) {
        this.pageClass = _class
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/login.scss";
</style>
