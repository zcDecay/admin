import request from '@/utils/request'

export function queryMenus() {
  return request({
    url: '/menu/queryMenus',
    method: 'get'
  })
}

export function adminQueryMenus(queryData) {
  return request({
    url: '/menu/queryMenus/admin',
    method: 'post',
    data: queryData
  })
}

export function queryMap() {
  return request({
    url: '/menu/queryMap',
    method: 'get'
  })
}