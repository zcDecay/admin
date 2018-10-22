<template>
  <div>
    <el-dialog :title="sonTitle" :visible.sync="visible" @open="open" @close="close" :before-close="close" :lock-scroll="true">
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="100px" style="width: 70%; margin-left:50px;">
        <el-form-item label="昵称" prop="pickName">
          <el-input type="text" v-model="dataForm.pickName" placeholder="用户名">
          </el-input>
        </el-form-item>
        <!-- <span v-if="sonTitle | titleFilter(sonTitle, titleMap)">
          <el-form-item label="密码" prop="userPwd">
            <el-input type="password" v-model="dataForm.userPwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="userPwd">
            <el-input type="password" v-model="dataForm.confirmpassword" placeholder="确认密码"></el-input>
          </el-form-item>
        </span> -->
        <el-form-item v-if="sonTitle | titleFilter(sonTitle, titleMap)">
          <uploadImage :image-url="dataForm.userIcon" flag="userIcon"></uploadImage>
          <uploadImage :image-url="dataForm.favicon" flag="favicon"></uploadImage>
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input type="email" v-model="dataForm.email" placeholder="电子邮件"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="userPhone">
          <el-input type="text" v-model.number="dataForm.userPhone" placeholder="联系电话">
          </el-input>
        </el-form-item>
        <el-form-item label="修炼等级" prop="roleId">
          <el-rate v-model="dataForm.roleId" :max="7" show-text :texts="levelList"></el-rate>
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="dataForm.signature" type="textarea" placeholder="Please input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" round>主页设置</el-button>
        <el-button type="primary" @click.native.prevent="sureHandler" :loading="sureLoading" round>确认</el-button>
        <!-- <el-button @click.native.prevent="reset" round>重置</el-button> -->
        <el-button @click="visible = false" round>取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="uploadVisible">
      <img width="100%" :src="dataForm.userIcon" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import * as USER_API from '@/api/user'
  import uploadImage from '@/components/Upload//uploadImage'
  export default {
    components: {
      uploadImage
    },
    data() {
      let confirmpasswordCheck = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error("密码是必须的"));
        } else if (value !== this.dataForm.userPwd) {
          return callback(new Error("两次输入的密码不一致"));
        } else {
          return callback();
        }
      };
      let telCheck = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error("电话号码是必须的"));
        } else if (!parseInt(value)) {
          return callback(new Error("电话号码必须是数字"));
        } else if (value.toString().length !== 11) {
          return callback(new Error("电话号码必须是11位数字"));
        } else {
          callback();
        }
      };
      return {
        visible: this.show,
        uploadVisible: false,
        sureLoading: false,
        dataForm: {
          pickName: '',
          userPwd: '',
          confirmpassword: '',
          userPhone: '',
          email: '',
          signature: '',
          userIcon: '',
          roleId: 0,
          favicon: ''
        },
        rules: {
          pickName: [{
            required: true,
            max: 9,
            min: 4,
            message: "用户名是必须的，长度为4-9位",
            trigger: "blur"
          }],
          userPwd: [{
            required: true,
            min: 6,
            max: 6,
            message: "密码是必须的！长度为6位",
            trigger: "blur"
          }],
          confirmpassword: [{
            required: true,
            validator: confirmpasswordCheck,
            trigger: "blur"
          }],
          userPhone: [{
            required: true,
            validator: telCheck,
            trigger: "blur"
          }],
          email: [{
            required: true,
            type: "email",
            message: "请输入正确的电子邮件格式(xxx@xxx.com)",
            trigger: "blur"
          }]
        },
        titleMap: {
          'Create': false,
          'Edit': true
        }
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      levelList: {
        type: Array,
        default: []
      },
      dataList: {
        type: Object,
        default: null
      },
      sonTitle: {
        type: String,
        default: 'Create'
      }
    },
    watch: {
      show() {
        this.visible = this.show;
      }
    },
    filters: {},
    methods: {
      open() {
        this.dataForm = this.dataList
      },
      close() {
        this.reset()
        this.$emit('update:show', false)
      },
      reset() {
        this.sureLoading = false;
        this.$emit('update:dataList', Object.create(null))
        // this.$refs['dataForm'].resetFields();
      },
      titleFilter(title, titleMap) {
        return titleMap[title]
      },
      sureHandler() {
        if (this.titleFilter(this.sonTitle, this.titleMap)) {
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              this.sureLoading = true;
              USER_API.updateUser(this.dataForm).then(res => {
                this.sureLoading = false;
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: "success"
                });
                this.reset()
                this.visible = false;
              });
            } else {
              console.log("submit err");
            }
          })
        } else {
          this.$refs.dataForm.validate(valid => {
            if (valid) {
              this.sureLoading = true;
              this.$store.dispatch("Regist", this.dataForm).then(res => {
                this.sureLoading = false;
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: "success"
                });
                this.reset()
                this.visible = false;
              });
            } else {
              console.log("submit err");
            }
          });
        }
      }
    }
  };
</script>
