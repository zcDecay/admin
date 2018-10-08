import { stat } from "fs";
import { resolve } from "path";
import store from '@/store'
import {login, regist} from '@/api/login'
import { getToken, removeToken, setToken } from "@/utils/auth";


const user = {
  state: {
    token: getToken(),
    onlyId: '',
    name: '',
    phone: '',
    signature: '',
    avatar: '',
    favicon: '',
    email: '',
    roles: []
  },
  mutations: {
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
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    //登录
    Login({commit},user) {
      const pickName = user.pickName.trim()
      const userPwd = user.userPwd;

      return new Promise((resolve, reject) => {
        login(pickName,userPwd).then(response => {
          const data = response.data
          setToken(data)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //登出
    LogOut({commit}){
      return new Promise(resolve =>{
        commit('SET_TOKEN','')
        removeToken()
        resolve()
      })
    },
    //注册
    Regist({commit},user){
      user.pickName = user.pickName.trim()

      return new Promise((resolve, reject) => {
        regist(user).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          store.commit('resetStore')
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
        Cookies.remove('Admin-Token');
        store.commit('resetStore')
        resolve();
      });
    },


  }
}

export default user