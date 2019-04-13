import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 添加渠道

export function addStaffInfo(params) {
  return request({
    url: 'm/staff',
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

// 获取渠道列表

export function getStaffList(params) {
  return request({
    url: 'm/staff',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    params
  })
}

// 修改员工信息

export function changeStaffInfo(id, params) {
  return request({
    url: 'm/staff/' + id,
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

export function disenableStaff(id, params) {
  return request({
    url: 'm/staff/' + id + '/disenable',
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}
