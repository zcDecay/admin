<template>
  <div class="data-wrapper">
    <div class="common-sidebar" :class="isShow? 'sidebarEx common-sidebar-ex': null">
      <p class="warn-content" v-if="isShow">
      <a href="https://www.newt.fun" target="_blank">zhangchaochao用户</a>
      </p>
      <!-- <div > -->
        <pan-thumb :image="item.userIcon" v-for="item of $store.getters.userAll" :key="item.id" v-if="isShow">
          {{item.signature}}
        </pan-thumb>
      <!-- </div> -->
      <i :class="isShow? 'el-icon-arrow-left': 'el-icon-arrow-right'" @click="changeShow">
      </i>
    </div>
  </div>
</template>

<script>
  import PanThumb from "@/components/PanThumb";
  export default {
    name: "listview",
    components: {
      PanThumb
    },
    pops: {
      viewDatas: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        isShow: false
      };
    },
    methods: {
      changeShow() {
        this.isShow = !this.isShow;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .common-sidebar {
    // margin: 20px 0 20px 0;
    height: 100%;
    width: 20px;
    position: absolute;
    -webkit-box-shadow: 10px 0 10px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 10px 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    z-index: 80;
    // background: -webkit-linear-gradient(top,#92bce7 0,#ffffd5 100%);

    i {
      text-align: center;
      position: absolute;
      // left: 0;
      bottom: 0;
      right: 0;
      height: 50%;
      cursor: pointer;
      color: #666;
      z-index: 1;
      font-weight: bolder;
      transition: all 0.3s;
    }

    i:hover {
      font-size: 18px;
    }
  }

  .common-sidebar:hover {
    transition: all 0.3s;
    width: 40px;
  }

  .sidebarEx {
    width: 99% !important;
    background-color: #fff;
  }

.warn-content{
  background: rgba(66,185,131,.1);
  border-radius: 2px;
  padding: 16px;
  padding: 1rem;
  line-height: 1.6rem;
  word-spacing: .05rem;
  a{
    color: #42b983;
    font-weight: 600;
  }
}
</style>
