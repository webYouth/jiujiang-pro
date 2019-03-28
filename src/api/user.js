import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 获取全部用户信息
export function getAllUserList(params) {
  return request({
    url: 'm/user',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    params
  })
}

// 获取已认证用户信息
export function getVerifyUserList(params) {
  return request({
    url: 'm/user/verify',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    params
  })
}
