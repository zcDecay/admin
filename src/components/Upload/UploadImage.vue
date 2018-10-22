<template>
    <el-upload class="image-uploader" :action="uploadAction" :show-file-list="false" :on-success="uploadSuccessHandler"
      :before-upload="beforeUploadHandler" :loading="uploadLoading">
      <img v-if="image" :src="image" class="image">
      <i v-else class="el-icon-plus image-uploader-icon"></i>
    </el-upload>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        uploadLoading: false,
        image: this.userIcon,
        uploadAction: process.env.BASE_URL + '/file/upload',
        flagMap: {
          'userIcon': true,
          'favicon': false
        }
      }
    },
    props: {
      imageUrl: {
        type: String,
        default: ''
      },
      flag: {
        type: String,
        default: 'userIcon'
      }
    },
    watch: {

    },
    filters: {

    },
    mounted() {
      this.image = this.imageUrl
    },
    methods: {
      flagFilter(flag, flagMap) {
        return flagMap[flag]
      },
      uploadSuccessHandler(res, file) {
        this.reverseLoading()
        this.image = res.data
        this.$message.success('上传成功');
        this.$emit('update:imageUrl', res.data)
      },
      beforeUploadHandler(file) {
        this.reverseLoading()
        let isType = '';
        let errorLog = '';
        let isFlag = this.flagFilter(this.flag, this.flagMap)
        if (isFlag) {
          switch (file.type) {
            case "image/jpeg":
            case "image/jpg":
            case "image/png":
              isType = true
              break;
            default:
              isType = false
              break;
          }
          errorLog = '上传头像图片只能是 JPG/png 格式!';
        } else {
          isType = file.type === "image/x-icon"
          errorLog = '上传头像图片只能是 ico 格式!';
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isType) {
          this.$message.error(errorLog);
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isType && isLt2M;
      },
      reverseLoading() {
        return !this.uploadLoading
      }
    }
  }
</script>

<style>
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .image {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
