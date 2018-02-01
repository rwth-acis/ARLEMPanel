<template>
  <!-- Forget Password -->
  <figure class="bottom">
    <div class="mdl-card mdl-shadow--6dp">
    <div class="mdl-card__title mdl-color--primary mdl-color-text--white relative">
      <a class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" v-on:click='flip("show-front")'><i class="material-icons">arrow_back</i></a>
      <h2 class="mdl-card__title-text">Lost Password</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="email"/>
      <label class="mdl-textfield__label" for="email">E-Mail</label>
      </div>
    </div>
    <div class="mdl-card__actions">
      <div class="mdl-grid">
      <button v-on:click='sendForget()' class="mdl-cell mdl-cell--12-col mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color-text--white">Reset Password</button>
      </div>
    </div>
    </div>
  </figure>
</template>

<script>
  export default {
    methods: {
      flip: function (_class) {
        this.$emit('flip', _class)
      },
      sendForget: function () {
        this.$emit('flip', 'show-front')
      }
    },
    mounted () {
      console.log('Forget Password Mounted.')
    }
  }
</script>
