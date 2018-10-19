<template>
  <div>
    <el-dialog title="Create" :visible.sync="visible" @close="close" :lock-scroll="true">
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-position="left" label-width="100px" style="width: 70%; margin-left:50px;">
        <el-form-item label="昵称" prop="pickName">
          <el-input type="text" v-model="dataForm.pickName" placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input type="password" v-model="dataForm.userPwd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userPwd">
          <el-input type="password" v-model="dataForm.confirmpassword" placeholder="确认密码"></el-input>
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
        <el-button @click.native.prevent="reset">重置</el-button>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="sureHandler" :loading="sureLoading">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
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
        } else if (!Number.isInteger(value)) {
          return callback(new Error("电话号码必须是数字"));
        } else if (value.toString().length !== 11) {
          return callback(new Error("电话号码必须是11位数字"));
        } else {
          callback();
        }
      };
      return {
        visible: this.show,
        sureLoading: false,
        dataForm: {
          pickName: "",
          userPwd: "",
          confirmpassword: "",
          userPhone: "",
          email: "",
          signature: "",
          roleId: 0
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
      }
    },
    watch: {
      show() {
        this.visible = this.show;
      }
    },
    filters: {
      // levelFilter(state, levelMap) {
      //  if(levelMap.length > 0){
      //    return levelMap[state].label
      //  }
      // }
    },
    methods: {
      close() {
        this.reset()
        this.$emit('update:show', false)
      },
      reset() {
        this.$refs.dataForm.resetFields();
      },
      sureHandler() {
        this.$refs.dataForm.validate(valid => {
          if (valid) {
            this.sureLoading = true;
            this.$store.dispatch("Regist", this.dataForm).then(res => {
              this.loading = false;
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
  };
</script>
