import axios from 'axios'

// baseURL + url拼接完整后台
const myAXIOS = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

export default myAXIOS
