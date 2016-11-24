const vueStore = {
  state: {
    count: 0
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    }
  }
}

export default vueStore
