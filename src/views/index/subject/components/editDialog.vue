<template>
  <!-- 4.编辑学科 -->
  <el-dialog title="编辑学科" :visible.sync="$parent.editFormVisible" class="edit-dialog" center>
    <el-form :model="editform" :rules="subRules" ref="editform">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="editform.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editform.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="editform.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="editform.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editform.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancleAdd">取 消</el-button>
      <el-button type="primary" @click="submiteditform">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "../../../../api/subject.js";
export default {
  data() {
    return {
      formLabelWidth: "80px",
      editform: {
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
    // 5.编辑学科数据
    submiteditform() {
      this.$refs.editform.validate(valid => {
        if (valid) {
          subjectEdit(this.editform).then(res => {
            if (res.data.code === 200) {
              this.$message.success("编辑成功");
              this.$parent.getsubjectList();
              this.cancleAdd();
            } else if (res.data.code === 201) {
              this.$message.warning("学科编号已存在,请重新输入～");
            } else {
              this.$message.error("编辑失败～请稍后再试");
            }
          });
        }
      });
    },
    // 取消编辑
    cancleAdd() {
      this.$parent.editFormVisible = false;
      this.$refs.editform.resetFields();
    }
  }
};
</script>

<style lang='less'>
// 新增学科的弹出框
.edit-dialog {
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