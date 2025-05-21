export default {
  namespaced: true,
  state: () => {
    return {
      historys: []
    }
  },
  mutations: {
    addHistory(state, text) {
      if (!text) return
      const index = state.historys.findIndex((item) => item == text)
      if (index > -1) {
        state.historys.splice(index, 1)
      }
      state.historys.unshift(text)
    },

    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },

    clearHistory(state) {
      state.historys = []
    }
  }
}
