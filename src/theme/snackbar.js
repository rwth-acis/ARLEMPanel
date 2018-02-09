const state = {
  sbarMessage: '',
  sbarActive: false
}

const getters = {
  sbarActive: (state) => {
    return state.sbarActive
  },

  sbarMessage: (state) => {
    return state.sbarMessage
  }
}

const actions = {
  showSnackBar (context, message) {
    context.commit('showSnackBar', message)
  },

  hideSnackBar (context) {
    context.commit('hideSnackBar')
  }
}

const mutations = {
  showSnackBar (state, messages) {
    var msgList = ''
    if ((typeof messages === 'object') && (messages !== null)) {
      for (var message in messages) {
        if (messages.hasOwnProperty(message)) {
          msgList += messages[message] + '<br />'
        }
      }
    } else {
      msgList += messages
    }
    state.sbarMessage = msgList
    state.sbarActive = true
  },

  hideSnackBar (state) {
    state.sbarMessage = ''
    state.sbarActive = false
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
