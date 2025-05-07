import request from '@/utils/service'

export const getCategory = () => {
  return request({
    url: '/category'
  })
}
