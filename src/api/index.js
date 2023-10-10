import request from '@/utils/request'

export const getAPIList = () => {
  return request({
    url: 'http://geek.itheima.net/v1_0/channels'
  })
}
