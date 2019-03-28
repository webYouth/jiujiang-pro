import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 添加渠道


export function addChannelInfo(params) {

  return request({
    url: 'm/channel',
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

// 获取渠道列表

export function getChannelList(params) {

  return request({
    url: 'm/channel',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    params
  })
}

// const getChannelList = (params, headers) => {
//   return request.get(`m/channel`, {
//     params: params,
//     headers: headers
//   })
// }

// 修改渠道信息

export function changeChannelInfo(params) {

  return request({
    url: 'm/channel',
    method: 'put',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

//
// const changeChannelInfo = (params, headers) => {
//   return request.put(`m/channel`, params, {
//     headers: {
//       'Authorization': 'Bearer ' + getToken()
//     },
//   })
// }
//
// // 删除渠道
//
// const removeChannel = (params, headers) => {
//   return request.delete(`m/channel`, params, {
//     headers: headers
//   })
// }

//
// export default {
//   addChannel,
//   changeChannelInfo,
//   removeChannel
// }
