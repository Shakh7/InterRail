import { createStore } from 'vuex'

import modules from './modules/index.js'

const store = createStore({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    token: null,
    user: {
      full_name: 'Shakhzodbek Sharipov',
      role: 'admin',
    }
  },
  mutations: {
    setUser(state, user){ 
      state.user = user
    },
    setToken(state, token){ 
      state.token = token
    }
  },
  actions: {
    setUser({commit}, user){ 
      commit('setUser', user)
    },
    setToken({commit}, token){ 
      commit('setToken', token)
    }
  },
  getters: {},
})

export default store

