import md5 from 'md5'
import { getProfile, loginUser } from '../../api/sys'
import { message } from '@/libs'

export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    async login(context, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })

      context.commit('setToken', data.token)

      context.dispatch('profile')
    },

    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      message(
        'success',
        `欢迎您 ${
          data.viplevel
            ? '尊敬的 VIP' + data.viplevel + '用户 ' + data.nickname
            : data.nickname
        }`,
        600
      )
    },

    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})

      location.reload()
    }
  }
}
