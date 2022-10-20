import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breads: [],
    userInfo: JSON.parse(sessionStorage.getItem('admin_demo_userInfo')) || {},
    token: ''
  },
  mutations: {
    addBread (state, bread) {
      const index = state.breads.findIndex(_bread => _bread.name === bread.name)
      if (index > -1) {
        state.breads.splice(index + 1, state.breads.length - index - 1)
      } else {
        state.breads.push(bread)
      }
    },
    removeBread (state, bread) {
      state.breads = state.breads.filter(_bread => _bread !== bread)
    },
    setUser (state, userInfo) {
      state.userInfo = userInfo
      sessionStorage.setItem('admin_demo_userInfo', JSON.stringify(userInfo))
      this.commit('setToken', userInfo.token)
      sessionStorage.setItem('admin_demo_token', userInfo.token)
      console.log(state.token)
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
