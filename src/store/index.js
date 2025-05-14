import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [
    createPersistedState({
      key: 'vuex-persist', // 存储的键名
      paths: ['category'] // 需要持久化的状态路径
    })
  ]
})

export default store
