<template>
  <div>我是用户信息页面</div>
</template>

<script>
import { userInfo } from "../../../api/user.js";
export default {
  data() {
    return {};
  },
  created() {
    let token = localStorage.getItem('token');
    userInfo(token).then(res => {
      window.console.log('用户信息',res);
    });
  }
};
</script>

<style>
</style>