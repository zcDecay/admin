import request from '@/utils/request'

export function getUserInfo(token) {
  return request({
    url: '/user/getUserInfo',
    method: 'post'
  })
}

export function queryMenus() {
  return request({
    url: '/user/queryMenus',
    method: 'get'
  })
}

export function queryRouter() {
  return request({
    url: '/user/queryRouter',
    method: 'get'
  })
}

export function queryLevel() {
  return request({
    url: '/user/queryLevel',
    method: 'get'
  })
}

export function updateState(id, state, cause) {
  const data = {
    id,
    state,
    cause
  }
  return request({
    url: '/user/updateState',
    method: 'post',
    data: data
  })
}


export function queryUsers(queryData) {
  return request({
    url: '/user/queryUsers',
    method: 'post',
    data: queryData
  })
}


export function deleteUser(id) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data: {
      id: id
    }
  })
}