import request from '@/utils/request'

export function getUserInfo(token){
  return request({
    url: '/user/getUserInfo',
    method: 'post'
  })
}

export function queryMenus(){
  return request({
    url: '/user/queryMenus',
    method: 'get'
  })
}

export function queryRouter(){
  return request({
    url: '/user/queryRouter',
    method: 'get'
  })
}