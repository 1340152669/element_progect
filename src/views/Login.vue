<template>
  <div class="content">
    <div class="box">
      <h3>
        <router-link :to="{ name: 'LoginPage' }">登录</router-link>
        <span>·</span>
        <router-link :to="{ name: 'RegisterPage' }">注册</router-link>
      </h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="密码"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="reg-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 14,
            message: "长度在 3 到 14 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "6-16位数字，字母，下划线",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/login",
            data: this.ruleForm,
          }).then((res) => {
            console.log(res.data);
            if (res.data.code == 5) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              setTimeout(()=>{
                this.$router.push('/')
              },2000)
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  overflow: hidden;
  .box {
    padding: 20px;
    width: 400px;
    min-height: 200px;
    background-color: #fff;
    margin: 200px auto;
    h3 {
      text-align: center;
      margin-bottom: 20px;
      span {
        margin: 0 10px;
      }
    }
    .reg-btn {
      width: 100%;
    }
    p {
      text-align: center;
    }
  }
}

.router-link-active {
  color: red;
  text-decoration: underline;
}
</style>