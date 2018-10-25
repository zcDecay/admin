<template>
  <div class="app-container">
    <el-container style="height:100%">

      <el-header>
        <transition enter-active-class="fadeInDownBig" appear>
          <navbar></navbar>
        </transition>
      </el-header>

      <el-container>

        <el-aside :class="{hiddenSide:sidebar.opened}">
          <el-container v-if="!sidebar.opened" class="containerEx">
            <el-aside>
              <transition enter-active-class="fadeInLeft" appear>
                <sidebar class="sidebar-container"></sidebar>
              </transition>
            </el-aside>
            <!-- <el-main class="common-sidebar-main" v-if="$store.getters.userAll">
              <list-view ></list-view>
            </el-main> -->
          </el-container>
        </el-aside>

        <el-main>
          <transition>
            <transition name="slide-fade">
              <router-view></router-view>
            </transition>

          </transition>
        </el-main>

      </el-container>

    </el-container>

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

<style rel="stylesheet/scss" lang="scss" scoped>
  .hiddenSide {
    width: auto !important
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
