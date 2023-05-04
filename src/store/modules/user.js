import { login, getUserInfo } from '@/utils/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant' // 取得token常量
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token // vuex
      setItem(TOKEN, token) // 本地
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    login(context, userInfo) {
      //  解构出用户名和密码
      const { username, password } = userInfo
      //  创建一个 promise
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
        })
          .then((data) => {
            // 储存 token
            this.commit('user/setToken', data.token)
            // 保存登陆时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    },
  },
}
