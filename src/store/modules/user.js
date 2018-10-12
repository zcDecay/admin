import { stat } from "fs";
import { resolve } from "path";
import store from '@/store'
import * as LOGIN_API from '@/api/login'
import { getToken, removeToken, setToken } from "@/utils/auth";
import * as USER_API from '@/api/user'


const user = {
  state: {
    user: Object.create(null),
    token: getToken(),
    onlyId: '',
    name: '',
    phone: '',
    signature: '',
    avatar: '',
    favicon: '',
    email: '',
    roleId: ''
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ONLYID: (state, onlyId) => {
      state.onlyId = onlyId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_SIGNATURE: (state, signature) => {
      state.signature = signature
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_FAVICON: (state, favicon) => {
      state.favicon = favicon
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    }
  },
  actions: {
    //登录
    Login({commit},user) {
      const pickName = user.pickName.trim()
      const userPwd = user.userPwd;

      return new Promise((resolve, reject) => {
        LOGIN_API.login(pickName,userPwd).then(response => {
          const data = response.data
          setToken(data)
          commit('SET_TOKEN', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    //注册
    Regist({commit},user){
      user.pickName = user.pickName.trim()

      return new Promise((resolve, reject) => {
        LOGIN_API.regist(user).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        LOGIN_API.logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          removeToken()
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken()
        resolve();
      });
    },
    //获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve,reject) => {
        USER_API.getUserInfo(state.token)
          .then(res => {
            if(!res || !res.data){
              reject('获取用户信息失败，请稍后重试！')
              return
            }
            
            const user = res.data
            commit('SET_USER', user)
            commit('SET_ONLYID', user.id)
            commit('SET_NAME', user.pickName)
            commit('SET_PHONE', user.userPhone)
            commit('SET_SIGNATURE', user.signature)
            commit('SET_EMAIL', user.email)
            commit('SET_AVATAR', user.userIcon)
            commit('SET_FAVICON', user.favicon)
            commit('SET_ROLEID', user.roleId)

            resolve(res)
          }).catch(error => {
            reject(error)
          })
      });
    }

  }
}

export default user