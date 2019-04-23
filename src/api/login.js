import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(params, headers) {
  return request.post(`m/login`, params, {
    headers: headers
  })
}

export function changePassword(params, headers) {
  return request({
    url: 'm/password/change',
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function getInfo(token) {
  return request.get(`m/admin/permission`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
