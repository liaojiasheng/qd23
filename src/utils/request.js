import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAXIOS = axios.create({
  baseURL
})

// 白名单: 不需要携带token的api地址
const whiteAPIList = ['/api/reg', '/api/login']

// 定义请求拦截器
myAXIOS.interceptors.request.use(function (config) {
  if (!whiteAPIList.includes(config.url)) {
    // 为请求头挂载 Authorization 字段
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// // 定义响应拦截器
myAXIOS.interceptors.response.use(function (response) {
  // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
  return response
}, function (error) {
  // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
  if (error.response.status === 401) {
    // 无效的 token
    // 把 Vuex 中的 token 重置为空，并跳转到登录页面
    store.commit('updateToken', '')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default myAXIOS
