import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import createPersistedState from 'vuex-persistedstate'
import search from './modules/search'
import user from './modules/user'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      key: 'vuex-persist', // 存储的键名
      paths: ['category', 'theme', 'search', 'user'] // 需要持久化的状态路径
    })
  ]
})

export default store
