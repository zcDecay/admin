<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <!-- <div class="app-wrapper"> -->
    <el-container direction="vertical" v-if="!$route.meta.keepAlive" style="height:100%">
      <el-header>
        <transition mode="out-in" enter-active-class="fadeInDownBig" leave-active-class="fadeOutUp" appear>
          <navbar></navbar>
        </transition>
      </el-header>

      <el-container>
        <el-aside :class="{hideSidebar:!sidebar.opened}" v-if="!sidebar.opened">
          <transition mode="out-in" enter-active-class="fadeInLeft" leave-active-class="fadeOutDownBig" appear>
            <sidebar class="sidebar-container"></sidebar>
          </transition>
        </el-aside>
        <el-main>
          <transition mode="out-in" enter-active-class="rotateIn" leave-active-class="fadeOutLeft" appear>
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>

    </el-container>
    <!-- </div> -->

    <router-view v-if="$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  import {
    Navbar,
    Sidebar,
    AppMain
  } from '@/components/Common'

  export default {
    name: 'App',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
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
    padding: 20px 0 20px 20px
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
    overflow: hidden
  }
</style>
