<template>
  <!-- 3.新增学科 -->
  <el-dialog title="新增学科" :visible.sync="$parent.addFormVisible" class="add-dialog" center>
    <el-form :model="addform" :rules="subRules" ref="addform">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="addform.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="addform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
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
import { subjectAdd } from "../../../../api/subject.js";
export default {
  data() {
    return {
      formLabelWidth: "80px",
      addform: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      subRules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 5.新增学科数据
    submitaddform() {
      this.$refs.addform.validate(valid => {
        if (valid) {
          subjectAdd(this.addform).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getsubjectList();
              this.cancleAdd();
            } else if (res.code === 201) {
              this.$message.warning("学科编号已存在,请重新输入～");
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
// 新增学科的弹出框
.add-dialog {
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      // text-align: center;
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