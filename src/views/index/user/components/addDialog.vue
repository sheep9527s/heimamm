<template>
  <el-dialog title="新增用户" :visible.sync="$parent.addFormVisible" class="adduser-dialog" center>
    <el-form :model="addform" :rules="myRules" ref="addform">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="addform.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="addform.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="addform.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
        <el-select v-model="addform.role_id" placeholder="请选择角色" class="state-select">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="addform.status" placeholder="请选择状态" class="state-select">
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addform.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancleAdd">取 消</el-button>
      <el-button type="primary" @click="submitaddform">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAdd } from "../../../../api/user.js";
export default {
  data() {
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
    return {
      formLabelWidth: "80px",
      addform: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      myRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 14, message: "名称长度为2到14位哦～" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" }, 
          {type:'email',message:'邮箱格式不正确~',trigger:'change'}
          ],
        phone: [{ required: true, validator:checkPhone, trigger: ["blur","change"] }],
        role_id: [
          { required: true, message: "请选择角色", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 5.新增用户数据
    submitaddform() {
      this.$refs.addform.validate(valid => {
        if (valid) {
          userAdd(this.addform).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getData();
              this.cancleAdd();
            } else if (res.code === 201) {
              this.$message.warning("用户编号已存在,请重新输入～");
            } else {
              this.$message.error("新增失败～请稍后再试");
            }
          });
        }
      });
    },
    // 取消新增
    cancleAdd() {
      this.$parent.addFormVisible = false;
      this.$refs.addform.resetFields();
    }
  }
};
</script>

<style lang='less'>
// 新增用户的弹出框
.adduser-dialog {
  .el-dialog {
    width: 477px;
    .el-dialog__header {
      background: linear-gradient(to right, #01c4fa, #1294fa);
      margin-bottom: 20px;
      .el-dialog__title,
      i {
        color: white;
      }
    }
  }
}
</style>