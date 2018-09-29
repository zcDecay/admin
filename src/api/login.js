import request from '@/utils/request'

export function login(pickName,userPwd){
  const data = {
    pickName,
    userPwd
  }
  return request({
    url: '/login/getToken',
    method: 'post',
    data: data
  })
}

export function getUser(token){
  return request({
    url: '/user/info',
    method: 'post',
    data: {
      token
    }
  })
}

export function logout(){
  return request({
    url: 'user/logout',
    method: 'post'
  })
}