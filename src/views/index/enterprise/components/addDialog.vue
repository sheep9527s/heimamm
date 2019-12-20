<template>
  <!-- 3.新增企业 -->
  <el-dialog title="新增企业" :visible.sync="$parent.addFormVisible" class="add-dialog" center>
    <el-form :model="addform" :rules="subRules" ref="addform">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="addform.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="addform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
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
import { enterpriseAdd } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      formLabelWidth: "80px",
      addform: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      subRules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 5.新增企业数据
    submitaddform() {
      this.$refs.addform.validate(valid => {
        if (valid) {
          enterpriseAdd(this.addform).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getdata();
              this.cancleAdd();
            } else if (res.code === 201) {
              this.$message.warning("企业编号已存在,请重新输入～");
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
// 新增企业的弹出框
.add-dialog {
  .el-dialog {
    width: 603px;
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