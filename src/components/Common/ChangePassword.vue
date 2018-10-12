<!-- ChangePassword -->
<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="visible" @close="close" :lock-scroll="false">
      <el-form ref="form" :model="form" label-width="110px" :rules="rules" style="height: 260px">
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input v-model="form.oldPwd" placeholder="请输入原密码" type="password" :maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input v-model="form.newPwd" placeholder="请输入新密码" type="password" :maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPwd" required>
          <el-input v-model="form.confirmPwd" placeholder="请输入确认密码" type="password" :maxlength="32"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handelSaveClick('form')">确 定</el-button>
        <el-button @click="handelCancelClick"><i class="icon iconfont icon-icon-1"></i>关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import * as USER_API from '@/api/user'
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'))
        } else if (value != this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else if (value.length > 32 || value.length < 1) {
          callback(new Error('长度在 1 到 32 个字符'))
        } else {
          callback()
        }
      }
      return {
        visible: this.show,
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        rules: {
          oldPwd: [{
              required: true,
              message: '请输入原密码',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur'
            }
          ],
          newPwd: [{
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 32,
              message: '长度在 1 到 32 个字符',
              trigger: 'blur'
            }
          ],
          confirmPwd: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show() {
        this.visible = this.show
      }
    },
    methods: {
      close() {
        this.$refs['form'].resetFields()
        this.$emit('update:show', false)
      },
      handelCancelClick() {
        this.close()
      },
      handelSaveClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.utils.confirm('确认修改？').then(() => {
              USER_API.changePassword(this.form).then(res => {
                if (res && res.code == 200) {
                  if (res.data == -1) {
                    this.$message.error('旧密码不正确')
                  } else if (res.data > 0) {
                    this.$message.success('修改成功')
                    this.close()
                  } else {
                    this.$message.error('操作失败')
                  }
                }
              })
            })
          }
        })
      }
    }
  }
</script>
