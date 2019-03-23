import request from '@/utils/request'

export function login(params, headers) {
  return request.post(`m/login`, params, {
    headers: headers
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
