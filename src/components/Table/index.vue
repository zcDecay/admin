<template>
  <div class="app-table" :v-loading="loading" element-loading-text="拼命加载中">
    <el-row :gutter="0" class="filter-container" v-if="$slots.default">
      <slot></slot>
    </el-row>
    <el-row>
      <el-col>
        <slot name="table"></slot>
      </el-col>
    </el-row>
    <el-row v-show="showPagination">
      <el-col>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<style type="less">
.pagination {
  display: block;
  clear: both;
}
.el-pagination {
  float: left;
  padding: 10px 0px 10px 0px;
}
.filter-item-group .el-form-item {
  margin-bottom: 0px !important;
}
</style>
<script>
export default {
  name: 'AppTable',
  data() {
    return {
      tableData: this.pageData,
      loading: false,
      page: {
        pageSize: 20,
        pageNum: this.pageData.pageNum
      }
    }
  },
  watch: {
    pageData(nval, oval) {
      // 监听数据变化，导致页面数据显示为空
      if (nval.pageNum > 1 && nval.list.length == 0) {
        this.handleCurrentChange(1)
      }
    }
  },
  props: {
    pageData: {
      type: Object,
      default: function() {
        return {
          total: 0,
          pageSize: 20,
          pageNum: 1,
          pages: 0,
          size: 0
        }
      }
    },
    autoLoad: {
      type: Boolean,
      default: true
    }
  },
  created() {},
  computed: {
    total: function() {
      return this.pageData.total
    },
    pageNum: function() {
      return this.pageData.pageNum
    },
    pageSizes: function() {
      const arr = []
      if (this.pageData.total > 0) {
        arr.push(20)
      }
      if (this.pageData.total > 20) {
        arr.push(50)
      }
      if (this.pageData.total > 50) {
        arr.push(100)
      }

      return arr
    },
    pageSize: function() {
      return this.pageData.pageSize
    },
    showPagination: function() {
      if (this.pageData.pages && this.pageData.pages > 1) {
        return true
      }
      return true
    }
  },
  mounted() {
    if (this.autoLoad) {
      this.$nextTick(function() {
        this.handleCurrentChange(1)
      })
    }
  },
  methods: {
    handleSizeChange: function(size) {
      this.size = size
      // if (this.pageData.total <= size && this.pageData.total <= this.size) {

      // } else {
      this.page.pageNum = 1
      this.page.pageSize = size
      this.$emit('fetchdata', {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum
      })
      // }
    },
    handleCurrentChange: function(to) {
      if (to) {
        // this.current = to;
        this.page.pageNum = to
        this.$emit('fetchdata', {
          pageSize: this.page.pageSize,
          pageNum: to
        })
      }
    }
  }
}
</script>
