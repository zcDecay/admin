<template>
  <el-main style="overflow: hidden;">
    <transition-group enter-active-class="animated bounceInDown" leave-active-class="animated rollOut">
      <el-form :model="registForm" ref="registForm" :rules="registRules" class="regform" label-width="0" :key="show"
        v-if="show">

        <h3>用户注册</h3>

        <el-form-item prop="pickName">
          <el-input type="text" v-model="registForm.pickName" placeholder="用户名">
          </el-input>
        </el-form-item>

        <el-form-item prop="userPwd">
          <el-input type="password" v-model="registForm.userPwd" placeholder="密码">
          </el-input>
        </el-form-item>

        <el-form-item prop="confirmpassword">
          <el-input type="password" v-model="registForm.confirmpassword" placeholder="确认密码">
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input type="email" v-model="registForm.email" placeholder="电子邮件">
          </el-input>
        </el-form-item>

        <el-form-item prop="userPhone">
          <el-input type="text" v-model.number="registForm.userPhone" placeholder="电话号码">
          </el-input>
        </el-form-item>

        <!-- <el-form-item prop="name">
          <el-input type="text" v-model="registForm.name" placeholder="昵称">
          </el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="success" class="submitBtn" round @click.native.prevent="registHandler" :loading="loading">
            注册
          </el-button>
          <el-button type="primary" class="resetBtn" round @click.native.prevent="reset">
            重置
          </el-button>
          <hr>
          <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
        </el-form-item>

      </el-form>
    </transition-group>
  </el-main>
</template>
<script>
  export default {
    data() {
      let confirmpasswordCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码是必须的'))
        } else if (value !== this.registForm.userPwd) {
          return callback(new Error('两次输入的密码不一致'))
        } else {
          return callback()
        }
      }
      let telCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('电话号码是必须的'))
        } else if (!Number.isInteger(value)) {
          return callback(new Error('电话号码必须是数字'))
        } else if (value.toString().length !== 11) {
          return callback(new Error('电话号码必须是11位数字'))
        } else {
          callback()
        }
      }
      return {
        registForm: {
          pickName: '',
          userPwd: '',
          confirmpassword: '',
          userPhone: '',
          email: ''
        },
        registRules: {
          pickName: [{
            required: true,
            max: 9,
            min: 4,
            message: '用户名是必须的，长度为4-9位',
            trigger: 'blur'
          }],
          userPwd: [{
            required: true,
            min: 6,
            max: 6,
            message: '密码是必须的！长度为6位',
            trigger: 'blur'
          }],
          confirmpassword: [{
            required: true,
            validator: confirmpasswordCheck,
            trigger: 'blur'
          }],
          userPhone: [{
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }],
          email: [{
            required: true,
            type: 'email',
            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
            trigger: 'blur'
          }],
          // name: [{
          //   required: true,
          //   max: 12,
          //   min: 2,
          //   message: '昵称是必须的，最好是汉字',
          //   trigger: 'blur'
          // }]
        },
        loading: false,
        show: false,
        showTime: 500,
        showEvent: null
      }
    },
    mounted() {
      this.show = true
    },
    methods: {
      // ...
      reset() {
        this.$refs.registForm.resetFields()
      },
      registHandler() {
        this.$refs.registForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Regist', this.registForm).then(res => {
              this.loading = false
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: 'success'
                });
                this.$router.push({
                  path: '/login'
                })
            }).catch(() => {
              this.loading = false

            })
          } else {
            console.log('submit err')
          }
        })
      },
      tologin() {
        let router = this.$router;
        this.toShow()
        clearTimeout(this.showEvent)
        this.showEvent = setTimeout(function () {
          router.push('/login')
        }, this.showTime)
      },
      toShow() {
        this.show = false
      }
    }
  }
</script>

<style scoped>
  .regform {
    margin: 20px auto;
    width: 310px;
    background: #fff;
    box-shadow: 0 0 10px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }

  .submitBtn {
    width: 65%;
  }

  .to {
    color: #FA5555;
    cursor: pointer;
  }
</style>
