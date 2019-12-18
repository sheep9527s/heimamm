<template>
  <div>
    <!-- 1.筛选 -->
    <el-card class="box-card-header">
      <el-form :inline="true" :model="formFilter" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formFilter.user" class="num-input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formFilter.user" class="name-input"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formFilter.user" class="user-input"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formFilter.region" placeholder="请选择状态" class="state-select">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 2.表格数据 -->
    <!--  :filters="[{text: '1', value: '启用' }, { text: '1', value: '禁用' }]"
    :filter-method="filterStatus"-->
    <el-card class="box-card-table">
      <el-table :data="subjectData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="60"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="140"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="140"></el-table-column>
        <el-table-column prop="username" label="创建者" width="140"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="160">
          <template slot-scope="scope">{{scope.row.create_time | fit_createTime}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">{{ scope.row.status===0 ? '禁用':'启用' }}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">禁用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { subjectList } from "../../../api/subject.js";
import moment from "moment";
export default {
  data() {
    return {
      // 1.表单过滤条件的数据
      formFilter: {
        user: "",
        region: ""
      },
      // 2.学科的列表数据(表格)
      subjectData: [],
      // 3.分页
       currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    },
    //1. 分页方法 
      handleSizeChange(val) {
        window.console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        window.console.log(`当前页: ${val}`);
      }
  },
  created() {
    subjectList().then(res => {
      this.subjectData = res.data.data.items;
    });
  },
  // 过滤器
  filters: {
    fit_status(status) {
      return status == 0 ? "禁用" : "启用";
    },
    fit_createTime(time) {
      return moment(time).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang='less'>
.el-card {
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
}

//表格数据
.box-card-table {
  margin-top: 19px;
}
</style>