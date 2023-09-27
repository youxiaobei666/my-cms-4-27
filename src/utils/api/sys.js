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

/**
 * 获取所有用户列表
 */
export const getAllUserInfo = () => {
  return request({
    url: '/userinfo',
  })
}

// 删除用户接口
export const editUserInfo = (data) => {
  return request({
    url: '/userinfo/save',
    method: 'POST',
    data,
  })
}

export const deleteUser = (params) => {
  return request({
    url: `/userinfo/delete/${params}`,
    method: 'DELETE'
  })
}
