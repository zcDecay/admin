<template>
  <div class="app-container">

    <app-table ref="appTable" :page-data="pageData" border highlight-current-row @fetchdata="fetchData">

      <el-form :inline="true" :model="queryFilter">
        <el-form-item>
          <el-input style="width: 200px" v-model="queryFilter.menuName" placeholder="菜单名称" @keyup.native.enter="fetchData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFilter.menuGroupId" placeholder="请选择等级">
            <el-option v-for="item in roleList" :key="item.key" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFilter.sysDefault" placeholder="系统菜单">
            <el-option v-for="item in stateList" :key="item.key" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFilter.enable" placeholder="是否开启">
            <el-option v-for="item in stateList" :key="item.key" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round>权限分组</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" circle :loading="searchLoading" @click="fetchData"></el-button>
        </el-form-item>
      </el-form>
      <el-table stripe border highlight-current-row :data="pageData.list" style="width: 100%">
        <el-table-column type="index" align="center" style="width:8%" label="id"></el-table-column>
        <el-table-column align="center" style="width:12%" prop="menuName" label="菜单名称"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="menuDesc" label="菜单描述"></el-table-column>
        <el-table-column align="center" style="width:30%" prop="menuGroupId" label="分组权限"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="sysDefault" label="是否系统"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="menuIcon" label="菜单Icon"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="menuOrder" label="排序编号">
        </el-table-column>
        <el-table-column align="center" style="width:10%" prop="enable" label="开启状态">
        </el-table-column>
        <el-table-column align="center" style="width:20%" label="操作">
        </el-table-column>
      </el-table>

    </app-table>
  </div>

</template>

<script>
  import * as MENU_API from "@/api/menu"
  import * as USER_API from "@/api/user"
  export default {
    data() {
      return {
        pageData: Object.create(null),
        value3: true,
        searchLoading: false,
        roleList: [],
        stateList: [],
        queryFilter: {
          menuName: '',
          menuGroupId: '',
          sysDefault: '',
          enable: ''
        },
        sysMap: {
          true: 1,
          false: 0
        }
      };
    },
    filters: {
      sysFilter(value, map) {
        return map[value]
      }
    },
    watch: {},
    mounted() {
      USER_API.queryLevel().then(res => {
        this.roleList = res.data
      })
      MENU_API.queryMap().then(res => {
        this.stateList = res.data
      })
    },
    methods: {
      fetchData: function () {
        MENU_API.adminQueryMenus(this.queryFilter).then(res => {

          this.pageData = res.data
        })

      }
    }
  };
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
