<template>
  <div class="login-box">
    <!-- (1)左表单 -->
    <div class="from-box">
      <!-- 1. 表单标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 2.elementUi 表单 -->
      <el-form ref="ruleForm" class="login-form" :rules="rules" :model="ruleForm" status-icon>
        <!-- 2.1 用户名 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 2.2 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 2.3 验证码 -->
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="ruleForm.captcha"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="captchaUrl" alt class="captcha" @click="getcaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 2.4 用户协议 -->
        <el-form-item prop="xieyi">
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 2.5 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="dialogFormVisible=true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- (2)右图 -->
    <img src="../../assets/login_banner_ele.png" alt />

    <!-- (3)注册弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="regform" :rules="regRules" ref="regForm">
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="regform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="regform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="regform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="regform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="pcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regform.pcode" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="captchaUrl" alt @click="getcaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regform.rcode" autocomplete="off" class="rcodeImg"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button>{{ delay==0 ? '获取用户验证码' : `还剩${delay}s后重新发送`}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    // 1.自定义手机号的验证
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          return callback();
        } else {
          return callback(new Error("老弟，手机号格式不正确~"));
        }
      }
    };
    // 2.data的返回对象
    return {
      // 2.1 登录数据
      ruleForm: {
        phone: "",
        password: "",
        captcha: "",
        checked: false
      },
      // 2.2 登录数据的校验
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18个字符",
            trigger: "change"
          }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4", trigger: "change" }
        ]
      },
      // 2.3 注册数据
      regform: {
        name: "",
        email: "",
        phone: "",
        password: "",
        pcode: "",
        rcode: ""
      },
      // 2.4 注册数据的校验
      regRules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, message: "长度不少于2个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: ["blur", "change"] }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18个字符",
            trigger: "change"
          }
        ],
        rcode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      // 2.5 注册弹出框设置
      dialogFormVisible: false,
      formLabelWidth: "66px",
      // 2.6  发验证码的 time
      delay: 1,
      // 2.7 .验证码地址
      captchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login"
    };
  },
  methods: {
    // 1.登录事件
    login() {
      // 验证是否勾选协议
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.ruleForm.checked) {
            this.$message({
              message: "请同意用户协议",
              type: "warning"
            });
            return false;
          } else {
            this.$message({
              message: "恭喜你,验证通过",
              type: "success"
            });
            this.loginFn();
          }
        } else {
          this.$message.error("很抱歉，验证不通过~");
          return false;
        }
      });
    },
    //2.获取验证码
    getcaptcha() {
      this.captchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 3.登录的请求
    loginFn() {
      window.console.log(this.ruleForm);
      axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        withCredentials: true,
        data: {
          phone: this.ruleForm.phone,
          password: this.ruleForm.password,
          code: this.ruleForm.captcha
        }
      }).then(res => {
        window.console.log(res);
      });
    }
    // 4.注册
  }
};
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
    // 2.elementUi 表单
    .login-form {
      margin-top: 27px;

      // 2.1 勾选框
      .el-checkbox {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
        }
      }
      // 2.2 验证码
      .captcha {
        height: 40px;
        width: 100%;
      }
      // 2.3    按钮

      .el-button {
        width: 100%;
        margin: 0;
        margin-bottom: 28px;
      }
    }
  }

  // 注册弹出框
  .el-button {
    width: 100%;
  }

  .rcodeImg {
    width: 100%;
  }
}
</style>