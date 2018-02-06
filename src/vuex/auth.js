import authService from 'services/auth.services.js'
const state = {
  isAuthenticated: false,
  user: {}
}

const getters = {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  },

  user: (state) => {
    return state.user
  }
}

const actions = {
  signOut (context) {
    return new Promise((resolve) => {
      context.commit('signOut')
      resolve()
    })
  },
  signIn (context, credentials) {
    return new Promise((resolve) => {
      authService.patchSignIn(credentials.email, credentials.password)
        .then((response) => {
          context.commit('signIn', response)
          resolve()
        })
    })
  },
  signUp (context, user) {
    return new Promise((resolve) => {
      authService.postSignUp(user.name, user.email, user.password)
        .then((response) => {
          context.dispatch('showSnackBar', response.data)
          resolve()
        })
    })
  },
  forget (context, email) {
    return new Promise((resolve) => {
      authService.postForgetPassword(email)
        .then((response) => {
          context.dispatch('showSnackBar', response.data)
          resolve()
        })
    })
  }
}

const mutations = {
  signOut (state) {
    if (window !== 'undefined') {
      window.localStorage.removeItem('token')
    }
    state.isAuthenticated = false
  },
  signIn (state, response) {
    if (window !== 'undefined') {
      console.log(response.data.api_token)
      window.localStorage.setItem('token', response.data.api_token)
    }
    state.isAuthenticated = true
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
