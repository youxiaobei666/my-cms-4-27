import variables from '@/styles/variables.module.scss'

const getters = {
  token: (state) => state.user.token,
  /**
   * @returns true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: (state) => {
    return state.user.userInfo
  },
  cssVar: (state) => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
}
export default getters
