import { THTME_LIGHT } from '@/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      themeType: THTME_LIGHT
    }
  },
  mutations: {
    changeThemeType(state, newVal) {
      state.themeType = newVal
    }
  }
}
