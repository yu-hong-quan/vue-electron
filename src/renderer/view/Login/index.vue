<template>
  <div class="login">
    <div class="loginFrom">
      <div class="loginFromWapper">
        <img
          src="../../../../build/icons/HTMLicon.png"
          alt
          style="width:20%;margin-top:45px;margin-bottom:25px;"
        />
        <el-input placeholder="请输入用户名" v-model="userName" autocomplete="off" clearable>
          <el-button slot="prepend" icon="el-icon-setting"></el-button>
        </el-input>
        <el-input placeholder="请输入密码" v-model="passWord" autocomplete="off" show-password>
          <el-button slot="prepend" icon="el-icon-view"></el-button>
        </el-input>
        <SliderVerificationCode
          v-model="value"
          inactiveValue="未解锁"
          activeValue="已解锁"
          @change="handleChange(value)"
        />
        <el-button type="primary" :loading="loginBln" @click="goLogin">登录</el-button>
        <div class="zhuce">
          <p class="login-tips">Tips : 登录去展开您的新世界吧。</p>
          <span @click="centerDialogVisible = true">注 册</span>
        </div>
        <div class="beian">
          <p class="login-tips"><span @click="open('http://www.beian.miit.gov.cn')">粤ICP备20013658号</span></p>
        </div>
      </div>
      
    </div>
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <el-dialog
      title="注册"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
      center
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input placeholder="手机号/邮箱" v-model="ruleForm.name" autocomplete="off" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realname">
          <el-input
            placeholder="请输入真实姓名"
            v-model="ruleForm.realname"
            autocomplete="off"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="passWord">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="ruleForm.passWord"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="orlPassWord">
          <el-input
            placeholder="确认密码"
            show-password
            v-model="ruleForm.orlPassWord"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import $http from "@/api/user.js";
// import auth from "@/utils/auth";
export default {
  name: "login",
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
        let newValue = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!Number(value)) {
          callback(new Error("请输入用户名"));
        } else {
          if (value.length > 12) {
            callback(new Error("请填写手机号码"));
          } else {
            callback();
          }
        }
    };
    var realName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else {
        if (this.ruleForm.realName !== "") {
          this.$refs.ruleForm.validateField("realName");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.orlPassWord !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ddd: [{ validator: validatePass2, trigger: "change" }],
      userName: "",
      passWord: "",
      loginBln: false,
      wxInfo: null,
      value: "未解锁",
      centerDialogVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        realname: "",
        passWord: "",
        orlPassWord: ""
      },
      formLabelWidth: "120px",
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        realname: [{ validator: realName, trigger: "blur" }],
        passWord: [{ validator: validatePass, trigger: "blur" }],
        orlPassWord: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    open (link) {
        this.$electron.shell.openExternal(link)
    },
    goLogin: function() {
      let goData = {
        name: this.userName,
        password: this.passWord
      };
      if(this.userName == ''){
        this.MixinMessage("用户名不能为空！", "error");
        return false;
      }
      if(this.passWord == ''){
        this.MixinMessage("密码不能为空！", "error");
        return false;
      }
      if (this.value != "已解锁") {
        this.MixinMessage("请完成滑动验证！", "error");
        return false;
      }
	  this.MixinMessage('登录成功，欢迎来到余山郡', "success");
	  this.$router.push({ name:'home' });
      // $http.login(goData).then(data => {
      //   if (data.code != 200) {
      //     this.MixinMessage(data.message, "error");
      //     return false;
      //   }
      //   this.MixinMessage(data.message, "success");
      //   // localStorage.setItem("token", "yesLogin");
      //   this.$router.push({ name:'home' });
      // });
    },
    scan() {
      var _this = this;
      _this.wx.ready(function() {
        _this.wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
          success: function(res) {
            var data = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            var result = data.split(",")[1]; //返回的结果是码的类型+‘,’+内容，所以要以数组分割取第二个。
            //处理自己的逻辑
          }
        });
      });
    },
    handleChange(value) {
      console.log("您验证结果为:", value);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          $http.register(this.ruleForm).then(response => {
            console.log(response);
            if (response.code == -1) {
              this.MixinMessage(response.message, "error");
              return false;
            }
            this.MixinMessage(response.message, "success");
            this.centerDialogVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.$notify({
      title: "欢迎来到余山郡",
      message: "纯属兴趣，欢迎大家访问",
      iconClass: "el-icon-s-comment",
      duration: 5000,
      offset:35
    });
  }
};
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  height: 95%;
  background: url("https://static.runoob.com/images/mix/4781442-d6a8c2e5714b4c44.png")
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.login::-webkit-scrollbar{
    display: none;
  }
#particles-js {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.loginFrom {
  width: 400px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  /* border-radius: 10px; */
  padding-bottom: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 100;
  position: absolute;
  left: 0;
}

.loginFromWapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 65px;
}
.dialog-footer {
  display: flex;
}
.el-button--default {
  width: 35%;
  padding: 0;
}
.el-button--primary {
  width: 65%;
}

.el-input--suffix {
  width: 65%;
  margin-top: 20px;
}
.el-form-item__content .el-input--suffix {
  margin-top: 0;
}
.el-button {
  margin-top: 20px;
}

.zhuce {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  color: #409eff;
  font-size: 15px;
  margin-top: 30px;
  cursor: pointer;
}
.el-button--default {
  margin: 0px;
}
.zhuce span {
  padding: 3px 5px;
  border: 1px solid #409eff;
}
.login-tips {
  color: #fff;
  span{
      cursor: pointer;
      color: #409eff;
  }
}
.app-drag {
  width: 65%;
  margin-top: 10px !important;
}
.dialog-footer > button:nth-child(2) {
  margin-top: 0;
}
.el-button--default {
  padding: 0 1vw;
}
.beian{
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 0;
}
</style>
<style>
.el-input-group__append,
.el-input-group__prepend {
  padding: 0px;
}
</style>