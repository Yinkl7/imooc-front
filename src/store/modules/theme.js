import { THTME_LIGHT } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      themeType: THTME_LIGHT
    }
  },
  mutations: {
    changeThemeType(store, newVal) {
      store.themeType = newVal
    }
  }
}
