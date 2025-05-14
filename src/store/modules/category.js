import { getCategory } from '@/api/category'
import { All_CATEGORY_ITEM, DEFAULT_CATEGORY } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      categoryList: DEFAULT_CATEGORY
    }
  },
  mutations: {
    setCategory(state, newVal) {
      state.categoryList = [All_CATEGORY_ITEM, ...newVal]
    }
  },
  actions: {
    async getCategoryData(context) {
      let { categorys } = await getCategory()
      context.commit('setCategory', categorys)
    }
  }
}
