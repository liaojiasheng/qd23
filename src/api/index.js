import request from '@/utils/request'

export const getAPIList = () => {
  return request({
    url: 'http://geek.itheima.net/v1_0/channels'
  })
}

export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username,
      password,
      repassword
    }
  })
}

export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
