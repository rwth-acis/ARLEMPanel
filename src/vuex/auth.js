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
  logout (context) {
    return new Promise((resolve) => {
      context.commit('logout')
      resolve()
    })
  },
  login (context, credentials) {
    return new Promise((resolve) => {
      authService.postSignIn(credentials.email, credentials.password)
        .then((data) => {
          context.commit('login', data)
          resolve()
        })
    })
  }
}

const mutations = {
  logout (state) {
    if (window !== 'undefined') {
      window.localStorage.removeItem('token')
    }
    state.isAuthenticated = false
  },
  login (state, token) {
    if (window !== 'undefined') {
      window.localStorage.setItem('token', token)
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
