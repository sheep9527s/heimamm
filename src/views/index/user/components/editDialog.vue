<template>
  <el-dialog title="编辑用户" :visible.sync="$parent.editFormVisible" class="edituser-dialog" center>
    <el-form :model="formdata" :rules="myRules" ref="ref_editform">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="formdata.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="formdata.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="formdata.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
        <el-select v-model="formdata.role_id" placeholder="请选择角色" class="state-select">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="formdata.status" placeholder="请选择状态" class="state-select">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="formdata.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancleedit">取 消</el-button>
      <el-button type="primary" @click="submiteditform">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userEdit } from "../../../../api/user.js";
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
      formdata: {
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
          { type: "email", message: "邮箱格式不正确~", trigger: "change" }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: ["blur", "change"] }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 5.编辑用户数据
    submiteditform() {
      this.$refs.ref_editform.validate(valid => {
        if (valid) {
          userEdit(this.formdata).then(res => {
            if (res.code === 200) {
              this.$message.success("编辑成功");
              this.$parent.getData();
              this.cancleedit();
            } else if (res.code === 201) {
              this.$message.warning("用户编号已存在,请重新输入～");
            } else {
              this.$message.error("编辑失败～请稍后再试");
            }
          });
        }
      });
    },
    // 取消编辑
    cancleedit() {
      this.$parent.editFormVisible = false;
      this.$refs.ref_editform.resetFields();
    }
  }
};
</script>

<style lang='less'>
// 编辑用户的弹出框
// .edituser-dialog {
//   .el-dialog {
//     width: 477px;
//     .el-dialog__header {
//       background: linear-gradient(to right, #01c4fa, #1294fa);
//       .el-dialog__title,
//       i {
//         color: white;
//       }
//     }
//   }
// }
</style>