<template>
  <div>
    <!-- 1.条件筛选 -->
    <el-card class="box-card-header">
      <el-form :inline="true" :model="formFilter" class="demo-form-inline" ref='formFilter'>
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formFilter.rid" class="num-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formFilter.name" class="name-input"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formFilter.username" class="user-input"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop='status'>
          <el-select v-model="formFilter.status" placeholder="请选择状态" class="state-select">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getsubjectList">搜索</el-button>
          <el-button type="primary" @click='clearSearch'>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFormVisible = true" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 2.表格数据 -->
    <el-card class="box-card-table">
      <el-table :data="subjectData" style="width: 100%" :cell-style="statusStyle">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="140"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="140"></el-table-column>
        <el-table-column prop="username" label="创建者" width="140"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="160">
          <template slot-scope="scope">{{(scope.row.create_time).split(' ')[0]}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">{{ scope.row.status === 0 ? '禁用' : '启用' }}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="changeStatus(scope.row)"
            >{{scope.row.status === 0 ? '启用':'禁用'}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="limit"
        :pager-count="11"
        layout="total, sizes, prev, pager, next, jumper"
        :total="subTotal"
      ></el-pagination>
    </el-card>

    <!-- 3.新增学科 -->
    <addDialog></addDialog>

    <!-- 4.编辑学科 -->
    <editDialog ref='editDialog'></editDialog>
  </div>
</template>

<script>
import {
  subjectList,
  subjectDel,
  subjectEditStatus
} from "../../../api/subject.js";
import moment from "moment";
import addDialog from "./components/addDialog.vue";
import editDialog from "./components/editDialog.vue";
export default {
  name: "subject",
  data() {
    return {
      // 1.表单过滤条件的数据
      formFilter: {
        name: "",
        rid: "",
        username: "",
        status: ""
      },
      // 2.学科的列表数据(表格)
      subjectData: [],
      // 3.分页
      pageSizes: [5, 10, 15, 20], // 3.1页容量选项 数组
      limit: 10, // 3.2 每页多少条
      subTotal: 0, //总条数
      currentPage: 1, //当前页码
      // --- 4.新增学科---
      addFormVisible: false,
      // --- 5.编辑学科---
      editFormVisible: false
    };
  },
  methods: {
    //1. 分页方法
    // pageSize 改变时会触发(每页显示条目个数)
    handleSizeChange(val) {
      this.limit = val;
      this.getsubjectList();
    },
    // currentPage 改变时会触发(当前页数)
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getsubjectList();
    },
    // 2.编辑数据（进入编辑页）
    handleEdit(item) {

      this.editFormVisible = true;
      // 深拷贝 function无法拷贝
      this.$refs.editDialog.editform = JSON.parse(JSON.stringify(item));
      // // 传值过去
      // window.console.log('item--->',item);
      // // 对象转字符串
      // window.console.log('对象转字符串--->',JSON.stringify(item));
      // // 字符串转对象
      // window.console.log('字符串转对象---->',JSON.parse(JSON.stringify(item)));

      // subjectEdit()
    },
    // 3.禁用/启用数据
    changeStatus(item) {
      var statusStr = "禁用";
      if (item.status == 1) {
        statusStr = "启用";
      }
      this.$confirm(`确定要${statusStr}嘛`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectEditStatus({ id: item.id }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(`${statusStr}成功`);
              // 刷新页面
              this.getsubjectList();
            } else {
              this.$message.error(`${statusStr}失败，请稍后再试~`);
            }
          });
        })
        .catch(() => {});
    },
    // 4.删除数据
    handleDelete(item) {
      this.$confirm("确定要删除嘛", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectDel({ id: item.id }).then(res => {
            if (res.data.code === 200) {
              this.$message.success("删除成功");
              // 刷新页面
              this.getsubjectList();
            } else {
              this.$message.error("删除失败，请稍后再试");
            }
          });
        })
        .catch(() => {});
    },
    // 5.获取学科列表
    getsubjectList() {
      subjectList({
        page: this.currentPage,
        limit:this.limit,
        ...this.formFilter
      }).then(res => {
        this.subTotal = res.data.data.pagination.total;
        this.subjectData = res.data.data.items;
      });
    },
    // 6.设置禁用字段的样式
    statusStyle(row) {
      if (row.column.label == "状态" && row.row.status == 0) {
        return "color:#FF747B";
      }
    },
    // 7.清除搜索条件框
    clearSearch(){
       this.$refs.formFilter.resetFields();   
      this.getsubjectList();
    }
  },
  created() {
    this.getsubjectList();
  },
  // 过滤器
  filters: {
    fit_createTime(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  },
  components: {
    addDialog,
    editDialog
  }
};
</script>

<style lang='less'>
.el-card {
  // 表格的样式
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .num-input,
  .user-input {
    width: 100px;
  }
  .name-input,
  .state-select {
    width: 149px;
  }

  //分页
  .el-pagination {
    margin-top: 30px;
    text-align: center;
  }
}

//表格数据
.box-card-table {
  margin-top: 19px;
}
</style>