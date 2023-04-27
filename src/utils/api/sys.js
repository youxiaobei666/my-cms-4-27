import request from '@/utils/request'

/**
 * 登陆
 */

export const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/profile',
  })
}
