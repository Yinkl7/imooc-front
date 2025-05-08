import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

service.interceptors.response.use((response) => {
  const { data, success, message } = response.data
  if (success) {
    return data
  }
  // TODO 业务请求错误
  return Promise.reject(new Error(message))
})

export default service
