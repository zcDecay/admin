<template>
  <div class="navMenu">

    <template v-for="navMenu in menus">
      <!-- 最后一级菜单 -->
      <el-menu-item v-if="navMenu.childs.length === 0 && navMenu.entity" :key="navMenu.entity.id" :data="navMenu"
        :index="navMenu.entity.name" :route="navMenu.entity.path">
        <b>
          <i class="iconfont" :class="navMenu.entity.icon"></i>
          <span slot="title">{{navMenu.entity.name}}</span>
        </b>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.childs.length != 0 && navMenu.entity" :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
        <template slot="title">
          <b>
            <i class="iconfont" :class="navMenu.entity.icon"></i>
            <span> {{navMenu.entity.name}}</span>
          </b>
        </template>
        <!-- 递归 -->
        <nav-menu :menus="navMenu.childs"></nav-menu>
      </el-submenu>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: {
      menus: {
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {},
  }
</script>

<style scoped>

</style>
