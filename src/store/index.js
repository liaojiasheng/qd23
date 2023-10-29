import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 用户头像
  },
  mutations: {
    updateToken (state, newToken) {
      state.token = newToken
    },
    getUserInfo (state, messsage) {
      state.userInfo = messsage
    }
  },
  actions: {
    async getUserInfoAction (store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('getUserInfo', res.data)
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
