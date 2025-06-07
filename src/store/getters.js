export default {
  // category
  categoryList: (state) => state.category.categoryList,
  // 主题
  themeType: (state) => state.theme.themeType,
  // 当前点击目录
  currentCategory: (state) => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    return getters.categoryList.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  historys: (state) => state.search.historys,
  searchText: (state) => state.app.searchText,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo
}
