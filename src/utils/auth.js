import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function checkPermission(permission) {
  const role = localStorage.getItem('role')

  for (var p in permission) {
    if (role == permission[p]) {
      return true
    }
  }
  return false
}
