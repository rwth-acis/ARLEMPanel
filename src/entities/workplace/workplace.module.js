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
  },
  addWorkplaceItem (context, item) {
    context.commit('addItem', item)
  },
  removeWorkplaceItem (context, index) {
    context.commit('removeItem', index)
  }
}

const mutations = {
  addItem (state, item) {
    state.currentItem = item
    state.items.push(item)
  },

  removeItem (state, index) {
    state.items.splice(index, 1)
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
