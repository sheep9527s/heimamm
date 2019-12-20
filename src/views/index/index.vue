<template>
  <el-container class="index-container">
    <!-- 1.头部 -->
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold icon" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/index_logo.png" alt class="logo" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="userInfo.avatar" alt class="headImg" />
        <span class="username">{{userInfo.username}}你好</span>
        <el-button size="small" type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧栏菜单 -->
      <el-aside width="auto" class="my-aside">
        <el-menu router default-active="/index/chart" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">科学列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from "../../utils/token.js";
import { logout } from "../../api/user.js";

export default {
  name:'index',
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    logout() {
      this.$confirm("确定要退出登录嘛", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            if (res.data.code === 200) {
              this.$store.state.userInfo = "";
              // 返回登录页面，并清除用户数据，清除token
              this.$message("已确认退出");
              this.$router.push("/login");
              removeToken();
            }
          });
        })
        .catch(() => {
          this.$message.error("已取消退出");
        });
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.userInfo;
    }
  },
};
</script>

<style lang='less'>
.index-container {
  height: 100%;
  // 1.头部
  .my-header {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 20px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }

    .right {
      display: flex;
      align-items: center;
      .headImg {
        border-radius: 50%;
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .username {
        font-size: 14px;
        color: #636363;
        margin-right: 38px;
      }
    }
  }
  // 2.侧边菜单
  .my-aside {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  //   3.主要内容
  .my-main {
    background-color: #E8E9EC;
  }
}
</style>