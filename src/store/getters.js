import variables from '@/styles/variables.module.scss'
import { MAIN_COLOR } from '@/constant'
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'

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
  userAllInfo: (state) => {
    return state.user.userAllInfo
  },
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR)),
    }
  },
  language: (state) => state.app.language,
  sidebarOpened: (state) => state.app.sidebarOpened,
  mainColor: (state) => state.theme.mainColor,
  routerList: (state) => state.permission.routs,
}
export default getters
