import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      key: 'vuex-persist', // 存储的键名
      paths: ['category', 'theme'] // 需要持久化的状态路径
    })
  ]
})

export default store
