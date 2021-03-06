const state = {
  basics: {
    name: '',
    workplace: '',
    language: '',
    description: '',
    actions: []
  },
  actions: [],
  currentAction: null,
  currentTrigger: null,
  triggerModeIcons: {
    'enter': 'arrow_forward_ios',
    'exit': 'arrow_back_ios',
    'click': 'mouse',
    'detect': 'filter_tilt_shift',
    'sensor': 'memory',
    'module': 'accessibility_new'
  }
}

const getters = {
  basics: (state) => {
    return state.basics
  },

  actions: (state) => {
    return state.actions
  },

  currentAction: (state) => {
    return state.currentAction
  },

  currentTrigger: (state) => {
    return state.currentTrigger
  },

  currentOperations: (state) => {
    if (state.actions.length > 0) {
      return state.actions[state.currentAction].triggers[state.currentTrigger].operations
    } else {
      return []
    }
  },

  triggerModeIcons: (state) => {
    return state.triggerModeIcons
  }
}

const actions = {
  addAction (context, action) {
    context.commit('addAction', action)
  },

  switchAction (context, index) {
    context.commit('switchAction', index)
  },

  removeAction (context, index) {
    context.commit('removeAction', index)
  },

  addTrigger (context, trigger) {
    context.commit('addTrigger', trigger)
  },

  switchTrigger (context, index) {
    context.commit('switchTrigger', index)
  },

  removeTrigger (context, index) {
    context.commit('removeTrigger', index)
  },

  addOperation (context, operation) {
    context.commit('addOperation', operation)
  },

  removeOperation (context, index) {
    context.commit('removeOperation', index)
  },

  saveBasics (context, basics) {
    context.commit('saveBasics', basics)
  }
}

const mutations = {
  addAction (state, action) {
    state.currentAction = state.actions.length
    state.currentTrigger = 0
    state.actions.push(action)
  },

  switchAction (state, index) {
    state.currentAction = index
    state.currentTrigger = 0
  },

  removeAction (state, index) {
    state.actions.splice(index, 1)
    if (index === state.currentAction) {
      state.currentAction = state.actions.length - 1
    } else if (index < state.currentAction) {
      state.currentAction = state.currentAction - 1
    }
  },

  addTrigger (state, action) {
    state.currentTrigger = state.actions[state.currentAction].triggers.length
    state.actions[state.currentAction].triggers.push({
      mode: 'click',
      text: 'Trigger',
      component: 'action-trigger-create',
      operations: [{
        mode: 'click',
        removeSelf: null,
        operation: null,
        entityType: null,
        entityId: null,
        primitiveId: null,
        poi: null,
        option: null,
        viewportId: null
      }],
      isValid: true
    })
  },

  switchTrigger (state, index) {
    state.currentTrigger = index
  },

  removeTrigger (state, index) {
    state.actions[state.currentAction].triggers.splice(index, 1)
    if (index === state.currentTrigger) {
      state.currentTrigger = state.actions[state.currentAction].triggers.length - 1
    } else if (index < state.currentTrigger) {
      state.currentTrigger = state.currentTrigger - 1
    }
  },

  addOperation (state, operation) {
    state.actions[state.currentAction].triggers[state.currentTrigger].operations.push(operation)
  },

  removeOperation (state, index) {
    state.actions[state.currentAction].triggers[state.currentTrigger].operations.splice(index, 1)
  },

  saveBasics (state, basics) {
    state.basics.name = basics.name
    state.basics.workplace = basics.workplace
    state.basics.language = basics.language
    state.basics.description = basics.description
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
