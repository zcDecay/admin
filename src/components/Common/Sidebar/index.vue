<template>
  <el-menu active-text-color="black" router>
    <nav-menu :menus="menus"></nav-menu>
  </el-menu>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  import NavMenu from './NavMenu'


  export default {
    components: {
      NavMenu
    },
    methods: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['menus'])
    }
  }
</script>