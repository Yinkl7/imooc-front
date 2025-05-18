import request from '@/utils/service'

export const getPexelsList = (params) => {
  return request({
    url: '/pexels/list',
    params
  })
}
