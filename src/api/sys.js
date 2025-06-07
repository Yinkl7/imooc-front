import request from '@/utils/service'

export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}

export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}
