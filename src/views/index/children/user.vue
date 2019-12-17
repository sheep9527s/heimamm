<template>
  <div>我是用户信息页面</div>
</template>

<script>
import { userInfo } from "../../../api/index.js";
export default {
  data() {
    return {};
  },
  created() {
    let token = localStorage.getItem('token');
    userInfo(token).then(res => {
      window.console.log(res);
    });
  }
};
</script>

<style>
</style>