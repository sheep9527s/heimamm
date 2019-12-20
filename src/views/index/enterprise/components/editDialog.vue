<template>
  <el-dialog title="编辑企业" :visible.sync="$parent.editFormVisible" class="mydialog" center>
    <el-form :model="formdata" ref="ref_editform" :rules="myrules">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="formdata.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="formdata.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="formdata.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="formdata.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="formdata.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancleform">取 消</el-button>
      <el-button type="primary" @click="submiteditform">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseEdit } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      formLabelWidth: "80px",
      formdata: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      myrules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    submiteditform() {
      enterpriseEdit(this.formdata).then(res => {
        if (res.code === 200) {
          this.$message.success("新增成功");
          this.$parent.getdata();
          this.cancleform();
        } else if (res.code === 201) {
          this.$message.warning("企业编号已存在,请重新输入～");
        } else {
          this.$message.error("新增失败～请稍后再试");
        }
      });
    },
    cancleform() {
      this.$parent.editFormVisible = false;
      this.$refs.ref_editform.resetFields();
    }
  }
};
</script>

<style lang='less'>
.mydialog {
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      background: linear-gradient(to right, #01c4fa, #1294fa);
      .el-dialog__title,
      i {
        color: white;
      }
    }
  }
}
</style>