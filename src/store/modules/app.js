import { All_CATEGORY_ITEM } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      currentCategory: All_CATEGORY_ITEM
    }
  },
  mutations: {
    changeCurrentCategoty(state, value) {
      state.currentCategory = value
    }
  }
}
