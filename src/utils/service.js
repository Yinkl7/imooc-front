import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data, success, message } = response.data
    if (success) {
      return data
    }
    // TODO 业务请求错误
    return Promise.reject(new Error(message))
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    // TODO 提示错误消息
    return Promise.reject(error)
  }
)

export default service
