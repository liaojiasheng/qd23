import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAXIOS = axios.create({
  baseURL
})

// 白名单: 不需要携带token的api地址
const whiteAPIList = ['/api/reg', '/api/login']
// 请求拦截器
myAXIOS.interceptors.request.use(function (config) {
  if (!whiteAPIList.includes(config.url)) {
    config.headers.Authorization = store.state.token
  } return config
}, function (error) {
  return Promise.reject(error).catch(err => { console.log(err) })
})
// 响应拦截器
myAXIOS.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    router.push('/login').catch(err => { console.log(err) })
  }
  return Promise.reject(error).catch(err => { console.log(err) })
})
export default myAXIOS
