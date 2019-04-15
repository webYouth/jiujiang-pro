/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function in_array(stringToSearch, arrayToSearch) {
  for (let s = 0; s < arrayToSearch.length; s++) {
    const thisEntry = arrayToSearch[s].toString()
    if (thisEntry === stringToSearch) {
      return true
    }
  }
  return false
}
