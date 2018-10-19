<template>
  <div class="app-container">
    <app-table ref="appTable" :page-data="pageData" @fetchdata="fetchData">
      <el-form :inline="true" :model="queryFilter">
        <el-form-item>
          <el-input style="width: 200px" v-model="queryFilter.pickName" placeholder="用户名" @keyup.native.enter="fetchData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 200px" v-model="queryFilter.userPhone" placeholder="手机号" @keyup.native.enter="fetchData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFilter.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.key" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" v-model="queryFilter.createTime" placeholder="创建日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" v-model="queryFilter.loginTime" placeholder="上次登录日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" circle :loading="searchLoading" @click="fetchData"></el-button>
          <el-button icon="el-icon-plus" circle @click="createHandler"></el-button>
          <el-button icon="el-icon-download" circle :loading="downloadLoading" @click="downloadHandler"></el-button>
        </el-form-item>
      </el-form>

      <el-table stripe border highlight-current-row :data="pageData.list" style="width: 100%">
        <el-table-column type="index" align="center" style="width:8%" label="id"></el-table-column>
        <el-table-column align="center" style="width:12%" prop="pickName" label="用户名"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="userPhone" label="手机号"></el-table-column>
        <el-table-column align="center" style="width:30%" prop="signature" label="个性签名"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="loginTime" label="上一次登录时间"></el-table-column>
        <el-table-column align="center" style="width:10%" prop="roleId" label="修炼等级">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.roleId | roleFilter(roleList, scope.row.roleId) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" style="width:10%" prop="state" label="状态">
          <template slot-scope="scope">
            <el-popover placement="top" width="160" trigger="hover">
              <p>{{scope.row.cause}}</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="stateHandler(scope.row)">修改</el-button>
              </div>
              <el-tag slot="reference" :type="scope.row.state | statusFilter(noStatusMap, scope.row.state)">{{
                scope.row.state | stateFilter(stateMap, scope.row.state)
                }}</el-tag>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" style="width:20%" label="操作">
          <template slot-scope="scope">
            <el-button :type="scope.row.state | noStatusFilter(statusMap,scope.row.state)" size="mini" round @click="stateHandler(scope.row)">
              <span v-if="scope.row.state === 0">
                解封
              </span>
              <span v-else>
                禁用
              </span>
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteHandler(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </app-table>
    <CreateUserDialog :show.sync="createUserVisible" :level-list="roleJson"></CreateUserDialog>
  </div>
</template>
<script>
  import * as USER_API from "@/api/user"
  import {
    parseTime
  } from '@/utils'

  import createuserdialog from '@/components/User/UserDialog/createuserdialog'
  export default {
    components: {
      createuserdialog
    },
    data() {
      return {
        pageData: Object.create(null),
        roleJson: [],
        roleList: [],
        loading: false,
        createUserVisible: false,
        searchLoading: false,
        downloadLoading: false,
        statusMap: {
          0: 'success',
          1: 'danger'
        },
        noStatusMap: {
          0: 'danger',
          1: 'success'
        },
        queryFilter: {
          pickName: '',
          userPhone: '',
          roleId: '',
          createTime: '',
          loginTime: ''
        },
        stateMap: {
          0: 'ban',
          1: 'normal'
        }
      }
    },
    filters: {
      stateFilter(state, stateMap) {
        return stateMap[state]
      },
      statusFilter(status, statusMap) {
        return statusMap[status]
      },
      noStatusFilter(status, statusMap) {
        return statusMap[status]
      },
      roleFilter(roleId, roleList) {
        if (roleList.length > 0) {
          return roleList[roleId - 1].label
        }
      }
    },
    watch: {
      createUserVisible() {
        if (this.createUserVisible === false) {
          this.fetchData()
        }
      }
    },
    mounted() {},
    methods: {
      fetchData: function () {
        this.searchLoading = true
        const params = Object.assign({}, this.queryFilter, this.$refs.appTable.page)

        USER_API.queryUsers(params).then(res => {
          this.pageData = res.data
          USER_API.queryLevel().then(res => {
            this.roleList = res.data
            this.roleJson = res.attachData

            this.searchLoading = false
          })
        })
      },
      stateHandler(row) {
        this.$prompt('请输入原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: row.cause,
          inputPattern: /^.{1,50}$/,
          inputErrorMessage: '字段内容不可为空或少于50字'
        }).then(({
          value
        }) => {
          USER_API.updateState(row.id, row.state, value).then(res => {
            this.$message({
              type: 'success',
              message: 'OK'
            });
            this.fetchData()
          })
        }).catch(() => {});

      },
      deleteHandler(row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          USER_API.deleteUser(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      createHandler() {
        this.createUserVisible = true
      },
      downloadHandler() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户名', '手机号', '个性签名', '创建时间', '修炼等级', '状态']
          const filterVal = ['pickName', 'userPhone', 'signature', 'createTime', 'roleId', 'state']
          const data = this.formatJson(filterVal, this.pageData.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '列表excel'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'createTime') {
            return parseTime(v[j])
          } else if(j === 'roleId'){
            return this.$options.filters['roleFilter'](v[j], this.roleList)
          } else if(j === 'state'){
            return this.$options.filters['stateFilter'](v[j], this.stateMap)
          }else {
            return v[j]
          }
        }))
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
