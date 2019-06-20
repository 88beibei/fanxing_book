<template>
  <div class="register">
    <div class="register-content">
      <!-- <div class="logo" @click="goHome">
        <span class="iconfont">&#xe606;</span>
        <span class="title">梵星网</span>
      </div> -->
      <ul class="register-input">
        <li class="register-phone">
          <span>+86</span>
          <input type="text" class="phone" placeholder="请输入手机号" v-model="params.mobile">
        </li>
        <!-- <li class="clear">
          <input class="fl" type="text" placeholder="请输入验证码" v-model="params.imgCode" :disabled="imgDisabled">
          <img class="fr auth-code" :src="imgSrc" @click="getNewImgCode">
        </li> -->
        <li class="clear">
          <input class="fl" type="text" placeholder="请输入验证码" v-model="params.smsCode">
          <button
            :class="['fr','button', 'button-small','code-num', disabledCls]"
            @click="sendSms"
            v-html="btnValue"
          ></button>
        </li>
      </ul>
    </div>

    <button class="confirm-btn" @click="register">下一步</button>
    <p class="go-logo">
      <span>已有账号？</span>
      <router-link to="login">立即登录</router-link>
    </p>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { setSession, getSession } from "@/api/auth";
import { telReg } from "@/config";
import { timing } from "@/api/utils";
import md5 from "js-md5";
export default {
  name: "Login-register",
  data() {
    return {
      imgSrc: "",
      imgDisabled: false,
      btnDisabled: 0,
      btnValue: "发送短信验证码",
      isDisabled:false,
      params: {
        mobile: "",
        imgCode: "", //图形验证码
        smsCode: "" //手机验证码
      }
    };
  },
  watch: {
    "params.mobile"(val) {
      // console.log(val);
      if (val.length > 0 && this.btnDisabled != 2) {
        this.btnDisabled = 1;
      } else if (val.length == 0) {
        this.btnDisabled = 0;
      }
    }
  },
  mounted() {
    // 获取图形验证码
    // this.getNewImgCode();
  },
  computed: {
    disabledCls() {
      var conf = ["disabled", "", "timing"];
      return conf[this.btnDisabled];
    }
  },
  methods: {
    goHome(){
      this.$router.push({name: 'home'})
    },
    sendSms() {
      if (this.btnDisabled != 1) return;
      if (!telReg.test(this.params.mobile)) {
        Toast("手机号码格式错误，请重新输入");
        return;
      }
      // if (this.params.imgCode.length !== 4) {
      //   Toast("图片验证码错误，请重新输入");
      //   return;
      // }
      let { mobile, imgCode } = this.params;
      let verifyCodeToken = getSession("verifyCodeToken");

      this.$http
        .post("/fanxing-api/v1/user/register/step1", {
          mobile: mobile,
          imageCode: imgCode,
          verifyCodeToken,
          businessType: 1,
        })
        .then(({ bstatus }) => {
          console.log(bstatus);
          if (bstatus.code == 0) {
            Toast("短信发送成功");
            // this.imgDisabled = true;
            timing(
              { maxTime: 120, disTime: 1 },
              time => {
                // console.log(time);
                this.btnDisabled = 2;
                this.btnValue =
                  '<font color="#0ABC8">' + time + "s</font> 重新获取";
              },
              () => {
                this.btnValue = "发送短信验证码";
                this.btnDisabled = 1;
                // this.imgDisabled = false;
                // this.params.imgCode = '';
                // this.getNewImgCode();
              }
            );
          } else {
          }
        },()=>{
            this.btnDisabled = 1;
            // this.imgDisabled = false;
            // this.getNewImgCode();
            // this.params.imgCode = '';
        });
    },
    getNewImgCode() {
      var timestamp = new Date().getTime(); // 时间戳
      setSession("verifyCodeToken", timestamp);
      this.imgSrc =
        "/fanxing-api/v1/user/imageCode?verifyCodeToken=" + timestamp;
    },
    register() {
      let { mobile, smsCode } = this.params;
      let verifyCodeToken = getSession("verifyCodeToken");
      this.$http
        .post("/fanxing-api/v1/user/register/step2", {
          mobile,
          verifyCodeToken,
          smsCode
        })
        .then(({ bstatus, data }) => {
          // this.$router.push({path:'/login/register'})
          if (bstatus.code == 0) {
            Toast({
              message: "手机验证成功",
              position: "middle",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({
                path: "/login/registerTwo",
                query: {
                  identifyAuthCode: data.identifyAuthCode
                }
              });
            }, 2000);
          } else {
            Toast(bstatus.msg);
            this.getNewImgCode();
            this.vevifyCode = ''; 
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.register {
  padding: 0.4rem 0.2rem 0.35rem;
  input {
    padding: 0.13rem;
    border: 1px solid #ededed;
    border-radius: 2px;
    font-size: 0.15rem;
  }
  .register-input {
    margin-bottom: 1.2rem;
    li {
      margin-bottom: 0.2rem;
      input {
        width: 55%;
      }
      .auth-code {
        width: 30%;
        height: 0.4rem;
      }
      .code-num {
        width: 30%;
        height: 0.45rem;
        background: #239df2;
        border-radius: 2px;
        font-size: 0.13rem;
      }
    }
    .register-phone {
      width: 100%;
      border: 1px solid #ededed; 
      // position: relative;
      display: flex;
      align-items: center;
      span {
        // position: absolute;
        margin-left: 0.13rem;
        // top: 0;
        // line-height: 0.45rem;
        // top: 0.12rem;
        font-size: 0.15rem;
      }
      .phone {
        padding-left: 0.1rem;
        width: 100%;
        box-sizing: border-box;
        border: 0;
      }
    }
  }
  .go-logo {
    text-align: center;
    margin-top: 0.2rem;
    // font-size: 12px;
    color: #c4c4c4;
    line-height: 0.22rem;
    a {
      color: #619ffe;
    }
  }
  .confirm-btn {
    width: 100%;
    height: 0.4rem;
    background: #239df2;
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 3px;
  }
}
</style>