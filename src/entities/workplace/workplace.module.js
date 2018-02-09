const state = {
  items: [],
  currentItem: {}
}

const getters = {
  items: (state) => {
    return state.items
  },

  currentItem: (state) => {
    return state.currentItem
  }
}

const actions = {
  addItem (context, item) {
    context.commit('addItem', item)
  }
}

const mutations = {
  addItem (state, item) {
    state.currentItem = item
    state.currentItem.push(item)
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
