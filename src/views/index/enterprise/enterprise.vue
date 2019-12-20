<template>
  <div class="main">
    <!-- 1.条件筛选 -->
    <el-card class="box-card-header">
      <el-form :inline="true" :model="formFilter" class="demo-form-inline" ref="formFilter">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="formFilter.eid" class="num-input"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formFilter.name" class="name-input"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formFilter.username" class="user-input"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formFilter.status" placeholder="请选择状态" class="state-select">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getdata">搜索</el-button>
          <el-button type="primary" @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFormVisible = true" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 2.表格数据 -->
    <el-card class="box-card-table">
      <el-table :data="priseData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="150"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="140"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="140"></el-table-column>
        <el-table-column prop="username" label="创建者" width="140"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="160">
          <template slot-scope="scope">{{(scope.row.create_time).split(' ')[0]}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else class="red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 3.新增弹框 -->
    <addForm></addForm>
    <!-- 4.编辑弹框 -->
    <editForm ref='editForm'></editForm>
  </div>
</template>

<script>
import {
  getEnterpriseList,
  enterpriseStatus,
  enterpriseRemove
} from "../../../api/enterprise.js";
import addForm from "./components/addDialog.vue";
import editForm from "./components/editDialog.vue";
export default {
  name: "enterprise",
  data() {
    return {
      // 1.表格数据
      priseData: [],
      // 2.筛选条件
      formFilter: {
        name: "",
        eid: "",
        username: "",
        status: ""
      },
      // 3.新增弹框
      addFormVisible: false,
      // 4. 编辑弹框
      editFormVisible: false,
      // 5.分页
      pageSizes: [5, 10, 15, 20], // 3.1页容量选项 数组
      limit: 10, // 3.2 每页多少条
      total: 0, //总条数
      currentPage: 1 //当前页码
    };
  },
  methods: {
    // ---- 1.分页
    // 1.1 条数发生变化时
    handleSizeChange(val) {
      this.limit = val;
      this.getdata();
    },
    // 1.2 页码发生变化时
    handleCurrentChange(val) {
      this.page = val;
      this.getdata();
    },
    // 2.修改状态
    changeStatus(item) {
      enterpriseStatus({ id: item.id }).then(res => {
        // if (res.code === 200) {
        //   this.$message.success("状态修改成功～～");
        // } else {
        //   this.$message.error("状态修改成失败，请稍后再试～");
        // }
        this.axiosback("状态修改", res);
        this.getdata();
      });
    },
    // 3.删除数据
    handleDelete(item) {
      enterpriseRemove({ id: item.id }).then(res => {
        this.axiosback("数据删除", res);
      });
    },
    // 4.编辑
    handleEdit(item) {
      this.editFormVisible = true;
      this.$refs.editForm.formdata = JSON.parse(JSON.stringify(item));
    },
    // 5.清空搜索
    clearSearch() {
      this.$refs.formFilter.resetFields();
      this.getdata();
    },
    // 6.获取企业的列表数据
    getdata() {
      getEnterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.formFilter
      }).then(res => {
        this.priseData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    axiosback(str, res, newCode, callback) {
      if (res.code === 200) {
        this.$message.success(`${str}成功～`);
      } else if (!newCode && res.code === newCode) {
        this.$message.waring(`${str}`);
        callback();
      } else {
        this.$message.error(`${str}失败，请稍后再试～`);
      }
    }
  },
  created() {
    this.getdata();
  },components:{
    addForm,editForm
  }
};
</script>

<style lang='less'>
.main {
  .el-card {
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

    // 禁用的样式
    span.red {
      color: #ff747b;
    }
  }
}
</style>