<template>
  <!-- Sign In -->
  <figure class="front">
    <div class="mdl-card mdl-shadow--6dp">
      <div class="mdl-card__title mdl-color--primary mdl-color-text--white relative">
        <h2 class="mdl-card__title-text">Sign In</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input type="email" class="mdl-textfield__input" v-model="email" />
          <label class="mdl-textfield__label" for="email">Email</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="password" v-model="password" />
          <label class="mdl-textfield__label" for="password">Password</label>
        </div>
      </div>
      <div class="mdl-card__actions">
        <div class="mdl-grid">
          <button v-on:click='signIn()' class="mdl-cell mdl-cell--12-col mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color-text--white">Login</button>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <a v-on:click='flip("show-left")' class="mdl-color-text--primary">Sign up!</a>
            <a v-on:click='flip("show-bottom")' class="mdl-color-text--primary" style="float: right">Lost Password?</a>
          </div>
        </div>
      </div>
    </div>
  </figure>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      flip: function (_class) {
        this.$emit('flip', _class)
      },
      signIn: function () {
        this.$store.dispatch('signIn', {email: this.email, password: this.password}).then(() => {
          this.email = ''
          this.password = ''
          this.$router.push('/dashboard')
        })
      }
    },
    mounted () {
      if (this.isAuthenticated === true) {
        this.$router.push('/dashboard')
      }
    }
  }
</script>
