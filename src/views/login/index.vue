<template>
  <el-main style="overflow: hidden;">
    <transition-group enter-active-class="animated bounceInDown" leave-active-class="animated rollOut">
      <el-form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" label-width="0" class="login-form"
        :key="show" v-if="show">
        <h3>后台登录系统</h3>
        <el-form-item prop="pickName">
          <el-input prefix-icon="iconfont icon-icon_zhanghao" type="text" placeholder="username" name="pickName"
            autocomplete="on" v-model="loginForm.pickName">
          </el-input>
        </el-form-item>

        <el-form-item prop="userPwd">
          <el-input prefix-icon="iconfont icon-chucun" type="password" placeholder="namePwd" name="namePwd"
            @keyup.enter.native="loginHandler" v-model="loginForm.userPwd" autocomplete="on">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="submitBtn" round @click.native.prevent="loginHandler" :loading="loading">
            登录
          </el-button>
          <el-button type="primary" class="resetBtn" round @click="resetEvent">
            重置
          </el-button>
          <hr>
          <p>还没有账号，马上去<span class="to" @click="toRegist">注册</span></p>
        </el-form-item>
      </el-form>
      <!-- <h3 :key="show" v-if="!show">后台登录系统</h3> -->
    </transition-group>
  </el-main>
</template>

<script>
  import {
    isvalidateUserName
  } from '@/utils/validate'
  export default {
    data() {
      const validatePickName = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error('用户名不能为空'))
        }
        if (!isvalidateUserName(value)) {
          callback(new Error('用户名最多10位'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
      return {
        show: false,
        loginForm: {
          pickName: '',
          userPwd: ''
        },
        loginRules: {
          pickName: [{
            required: true,
            trigger: 'blur',
            validator: validatePickName
          }],
          userPwd: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }]
        },
        loading: false,
        showTime: 500,
        showEvent: null
      };
    },
    mounted() {
      this.show = true
    },
    methods: {
      resetEvent() {
        this.$refs['loginForm'].resetFields();
      },
      loginHandler() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(res => {
              this.loading = false
              this.$message({
                showClose: true,
                message: res.message,
                type: 'success'
              });
              this.$router.push({
                path: '/'
              })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      toRegist() {
        let router = this.$router;
        this.toShow()
        clearTimeout(this.showEvent)
        this.showEvent = setTimeout(function () {
          router.push('/regist')
        }, this.showTime)
      },
      toShow() {
        this.show = false
      }
    }
  };
</script>

<style scoped>
  .login-form {
    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 35px #b4bccc;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }

  .submitBtn {
    width: 65%;
  }

  .to {
    color: #67c23a;
    cursor: pointer;
  }
</style>
