<template>
  <div class="login-box">
    <!-- 左表单 -->
    <div class="from-box">
      <!-- 1. 表单标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 2.elementUi 表单 -->

    </div>
    <!-- 右图 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login-box {
  // 弹性布局
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  // 左表单
  .from-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 42px;

    // 1.标题
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }

      i {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
  }
}
</style>