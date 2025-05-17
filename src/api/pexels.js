import request from '@/utils/service'

export const getPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    data 
  })
}
