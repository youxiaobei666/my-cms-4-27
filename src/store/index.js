import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import getters from './getters'
export default createStore({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
  },
})
