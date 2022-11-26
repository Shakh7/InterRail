import {createStore} from 'vuex'

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
            role: 'staff',
            id: 2
        },
        users_list: [],
        loaded_at_least_once: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        setUsers(state, users_list) {
            state.users_list = users_list
        },
        setLoadedTrue(state, status) {
            state.loaded_at_least_once = status
        },
    },
    actions: {
        setUser({commit}, user) {
            commit('setUser', user)
        },
        setToken({commit}, token) {
            commit('setToken', token)
        },
        async getUsers({commit}) {
            let auth = new Headers();
            auth.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

            let authOptions = {
                method: 'GET',
                headers: auth,
                redirect: 'follow'
            };

            let response = await fetch(`${process.env.VUE_APP_USERS_URL}/user/`, authOptions)
            let data = await response.json()
            commit('setUsers', data)
        }
    },
    getters: {
    },
})

export default store

