import request from '@/utils/request'

// 添加渠道

const addChannel = (params, headsers) => {
  return request.post(`m/channel`, params, {
    headers: headsers
  })
}

// 获取渠道列表

const getChannelList = (params, headers) => {
  return request.get(`m/channel`, {
    params: params,
    headers: headers
  })
}

// 修改渠道信息

const changeChannelInfo = (params, headers) => {
  return request.put(`m/channel`, params, {
    headers: headers
  })
}

// 删除渠道

const removeChannel = (params, headers) => {
  return request.delete(`m/channel`, params, {
    headers: headers
  })
}

export default {
  addChannel,
  getChannelList,
  changeChannelInfo,
  removeChannel
}
