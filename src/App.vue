<template>
  <div id="app">
    <el-container direction="vertical" v-if="!$route.meta.keepAlive" style="height:100%">
      <el-header>
        <transition mode="out-in" enter-active-class="fadeInDownBig" appear>
          <navbar></navbar>
        </transition>
      </el-header>

      <el-container>
        <el-aside :class="{hiddenSide:sidebar.opened}">
          <el-container>
            <el-aside :class="{hideSidebar:!sidebar.opened}" v-if="!sidebar.opened">
              <transition mode="out-in" enter-active-class="fadeInLeft" appear>
                <sidebar class="sidebar-container"></sidebar>
              </transition>
            </el-aside>
            <!-- <el-main class="common-sidebar-main" v-if="$store.getters.userAll">
              <list-view ></list-view>
            </el-main> -->
          </el-container>
        </el-aside>

        <el-main>

          <transition mode="out-in" enter-active-class="fadeInRight" leave-active-class="fadeOutLeft">
            <router-view></router-view>
          </transition>

        </el-main>
      </el-container>
    </el-container>
    <router-view v-if="$route.meta.keepAlive"></router-view>

  </div>
</template>
<script>
  import {
    Navbar,
    Sidebar,
    AppMain
  } from '@/components/Common'
  import listView from '@/components/ListView'

  export default {
    name: 'App',
    data() {
      return {
        isShow: false
      }
    },
    components: {
      Navbar,
      Sidebar,
      AppMain,
      listView
    },
    methods: {},
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    // border: hidden;
    overflow: hidden;
    background-color: #f5f5f5;
  }

  .el-aside {
    .el-aside {
      padding: 20px 0 20px 20px
    }

  }

  .hiddenSide {
    width: auto !important
  }

  .el-menu {
    height: 100%
  }

  .el-badge__content.is-fixed {
    top: 10px !important;
    right: 15px !important;
  }

  .el-header {
    height: auto !important
  }

  .el-main {
    width: 100%;
    overflow: hidden;
  }

  .el-menu-item.is-active {
    color: #409EFF !important
  }

  .el-container {
    height: 100% !important
  }
  
  .common-sidebar-main {
    width: auto !important;
    // padding: 20px 0 20px 0!important
  }
</style>
