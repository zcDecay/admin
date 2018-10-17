<template>
  <el-menu class="navbar" mode="horizontal">
    <a href="#" class="logo">
      <span class=""><b><i class="iconfont icon-rentijiance">&nbsp;</i>张超超的小后台管理</b></span>
    </a>
    <hamburger class="hamburger-container" :toggleclick="toggleSideBar"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">

      <el-dropdown class="right-menu-item" trigger="click">
        <el-badge value="1">
          <div class="el-dropdown-link padding-common">
            <b><i class="iconfont icon-xiaoxi"></i></b>
          </div>
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <ul class="message-list">
            <li>
              <!-- start message -->
              <router-link :to="{path:'/sys/message'}">
                <p>11111111111111</p>
              </router-link>
            </li>
            <li>
              <!-- start message -->
              <router-link :to="{path:'/sys/message'}">
                <p>111111</p>
              </router-link>
            </li>
            <li>
              <!-- start message -->
              <router-link :to="{path:'/sys/message'}">
                <p>111111</p>
              </router-link>
            </li>
          </ul>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="hover" class="right-menu-item">
        <div class="el-dropdown-link padding-common">
          <img :src='avatar'>
          <b>{{name}}</b>
        </div>
        <el-dropdown-menu slot="dropdown">
          <div >
            <div class="header-pic" :to="{ path: '/resetPwd' }">
              <!-- <el-tooltip class="item" effect="light" content="点击修改信息" placement="top-end">
                <img :src='avatar' class="img-circle" alt="User Image" @click="updateMsgHandler">
              </el-tooltip> -->
              <el-tooltip class="item" effect="light" content="点击修改信息" placement="top-end" >
                <pan-thumb :image="avatar">
                  {{signature}}
                </pan-thumb>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="light" content="signature" placement="bottom-end">
                <b>
                  <p>{{name}}</p>
                </b>
              </el-tooltip> -->
            </div>
            <div class="pull-left">
              <router-link :to="{ path: '/resetPwd' }">
                <el-button round>修改密码</el-button>
              </router-link>
            </div>
            <div class="pull-right">
              <el-button round @click="logout">退出</el-button>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tooltip effect="light" content="全屏" class="right-menu-item" style="vertical-align:middle;margin-top:-3px"
        placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
    </div>
  </el-menu>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  /* 面包屑 */
  import Breadcrumb from "@/components/Breadcrumb";
  /* 左侧开关 */
  import Hamburger from "@/components/Hamburger";
  /* 全屏 */
  import Screenfull from "@/components/Screenfull";

  import PanThumb from '@/components/PanThumb'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      Screenfull,
      PanThumb
    },
    data() {
      return {
        show: false
      };
    },
    computed: {
      ...mapGetters(["avatar", "sidebar", "name", "signature"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("ToggleSideBar");
      },
      updateMsgHandler() {

      },
      logout() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    min-height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;

        .el-dropdown-link {
          cursor: pointer;
          text-align: center;
        }

        .el-dropdown-link img {
          background-color: #fff;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }

        .el-dropdown-link:hover {
          background: #f9f9f9;
        }
      }

      .screenfull {
        height: 20px;
      }
    }

  }

  .padding-common {
    padding: 0 15px 0 15px;
  }

  .el-dropdown-menu {
    .header-pic {
      text-align: center;
      background-color: #fff;
      padding: 10px;
      cursor: pointer;
    }

    .header-pic img {
      vertical-align: middle;
      height: 90px;
      width: 90px;
      border: 3px solid;
      // border-color: transparent;
      // border-color: hsla(0, 0%, 100%, 0.2);
      border-color: #e4e7ed;
      background-color: #fff;
    }

    .header-pic p:hover {
      // font-size: 1.3rem;
      color: #108ee9;
    }

    .pull-left {
      background-color: #f9f9f9;
      padding: 5px;
      display: inline-block;
    }

    .pull-right {
      background-color: #f9f9f9;
      padding: 5px;
      display: inline-block;
    }
  }


  .message-list {
    list-style: none;
    padding: 0 10px;
  }

  .message-list li {
    list-style: none;
    height: 25px;
    line-height: 25px;
  }

  .message-list li a {
    text-decoration: none;
    color: #666666;
  }

  .message-list li:hover {
    background-color: #f9f9f9;
  }

  .logo {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 20px;
    color: #48576a;
    text-decoration: none
  }

  .logo .iconfont {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }

  .img-circle:hover {
    transform: 90deg
  }
</style>
