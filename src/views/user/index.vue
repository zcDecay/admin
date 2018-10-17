<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px" placeholder="用户名"></el-input>
      <!-- <el-select  placeholder="请选择">
        <el-option v-for="item in roleMap"  >
        </el-option>
      </el-select> -->
      <el-button icon="el-icon-search" circle></el-button>
      <el-button icon="el-icon-plus" circle></el-button>
      <el-button icon="el-icon-download" circle></el-button>
    </div>
    <el-table stripe border highlight-current-row :data="users" style="width: 100%">
      <el-table-column type="index" align="center" style="width:8%" label="id"></el-table-column>
      <el-table-column align="center" style="width:12%" prop="pickName" label="用户名"></el-table-column>
      <el-table-column align="center" style="width:10%" prop="userPhone" label="手机号"></el-table-column>
      <el-table-column align="center" style="width:30%" prop="signature" label="个性签名"></el-table-column>
      <el-table-column align="center" style="width:10%" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" style="width:10%" prop="loginTime" label="上一次登录时间"></el-table-column>
      <el-table-column align="center" style="width:10%" prop="roleId" label="修炼等级">
        <template slot-scope="scope">
          <!-- <el-rate
              v-model="scope.row.roleId"
              :max= "max"
              show-score
              text-color="#ff9900"
              :score-template="scope.row.roleId | roleFilter">
            </el-rate> -->
          <el-tag>{{ scope.row.roleId | roleFilter(roleMap, scope.row.roleId) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" style="width:10%" prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state | stateFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" style="width:20%" label="操作">
        <template slot-scope="scope">
          <el-button :type="scope.row.state | noStatusFilter" size="mini" round @click="stateHandler(scope.row)">
            <span v-if="scope.row.state === 0">
              解封
            </span>
            <span v-else>
              禁用
            </span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import * as USER_API from "@/api/user"
  export default {
    data() {
      return {
        importanceOptions: [1, 2, 3],
        calendarTypeOptions: [{
            label: '',
            value: 'China'
          },
          {
            label: 'US',
            value: 'USA'
          },
          {
            label: 'JP',
            value: 'Japan'
          },
          {
            label: 'EU',
            value: 'Eurozone'
          }
        ],
        users: [],
        value: 1,
        max: 7,
        roleMap: [],

      }
    },
    filters: {
      stateFilter(state) {
        const stateMap = {
          0: 'ban',
          1: 'normal'
        }
        return stateMap[state]
      },
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
      },
      noStatusFilter(status) {
        const statusMap = {
          0: 'success',
          1: 'danger'
        }
        return statusMap[status]
      },
      roleFilter(roleId, roleMap) {
        return roleMap[roleId]
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.fetchData()
      });
    },
    methods: {
      fetchData() {
        USER_API.getUsers().then(res => {
          this.users = res.data
          USER_API.queryLevel().then(res => {
            this.roleMap = res.data
            console.log(this.roleMap)
          })
        })
      },
      stateHandler(row) {
        USER_API.updateState(row.id, row.state).then(res => {
          this.fetchData()
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .filter-container {
    padding-bottom: 10px;
    text-align: initial;

    .filter-item {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
