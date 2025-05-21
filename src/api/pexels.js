import request from '@/utils/service'

export const getPexelsList = (params) => {
  return request({
    url: '/pexels/list',
    params
  })
}

export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}
