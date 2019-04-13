import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 添加渠道

export function addMarketInfo(params) {
  return request({
    url: 'm/market',
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

// 获取渠道列表

export function getMarketList(params) {
  return request({
    url: 'm/market',
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    params
  })
}

// const getMarketList = (params, headers) => {
//   return request.get(`m/channel`, {
//     params: params,
//     headers: headers
//   })
// }

// 修改渠道信息

export function changeMarketInfo(id, params) {
  return request({
    url: 'm/market/' + id,
    method: 'post',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
}

//
// const changeMarketInfo = (params, headers) => {
//   return request.put(`m/channel`, params, {
//     headers: {
//       'Authorization': 'Bearer ' + getToken()
//     },
//   })
// }
//
// // 删除渠道
//
// const removeMarket = (params, headers) => {
//   return request.delete(`m/channel`, params, {
//     headers: headers
//   })
// }

//
// export default {
//   addMarket,
//   changeMarketInfo,
//   removeMarket
// }
