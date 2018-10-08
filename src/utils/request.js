import axios from 'axios'
import store from '@/store'
import qs from 'qs'

import { Message, MessageBox} from 'element-ui'
import { getToken } from '@/utils/auth'

//创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,// api的baseurl
  timeout: 36000, //请求超时时间
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

//request拦截
service.interceptors.request.use(config => {
  if(store.getters.token){
      config.headers['Admin-Token'] = getToken() //让每个请求携带自定义Token，根据实际情况自行修改
  }

  config.transformRequest = [
    function(data) {
      if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8'){
        return qs.stringify(data, {
          arrayFormat: 'brackets'
        })
      }
      return data
    }
  ]
  return config
}, error =>{
  console.error(error)
  Promise.reject(error)
})

//response拦截
service.interceptors.response.use(response => {
    const res = response.data
    if(res.code !== 200) {

      if(response.data && response.data.code === 401) {// 401, token失效
        MessageBox.alert('长时间未登录，将跳转至登录页面','提示',{
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload()//为了重新实例化vue-router对象，避免bug
          })
        })
      }else if(response.data && response.data.code === 400){
        Message({
          message: res.data,
          type: 'error',
          duration: 5 * 1000
        })
      }else{
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject('error')
    }else{
      if(res.success === true){
        return res
      }else{
        Message({
          message: res.data,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
  },
  error => {
    console.log('error' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service