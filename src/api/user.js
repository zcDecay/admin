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

export function updateState(id, state) {
  const data = {
    id,
    state
  }
  return request({
    url: '/user/updateState',
    method: 'post',
    data: data
  })
}


export function getUsers() {
  return request({
    url: '/user/getUsers',
    method: 'get'
  })
}