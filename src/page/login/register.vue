<template>
  <div>
    <ul>
      <li>
        <span>+86</span>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="params.mobile"
        >
      </li>
      <li class="clear">
        <p class="fl">
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="params.imgCode"
          >
        </p>
        <img
          class="fl"
          :src="imgSrc"
          @click="getNewImgCode"
        >
      </li>
      <li class="clear">
        <p class="fl">
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="params.smsCode"
          >
        </p>
        <button
          :class="['fl','button', 'button-small', disabledCls]"
          @click="sendSms"
          v-html="btnValue"
        ></button>
      </li>
    </ul>
    <button
      class="button button-big"
      @click="register"
    >注册</button>
    <p>已有账号,立即注册</p>
  </div>

</template>

<script>
import { Toast } from "mint-ui";
import { setSession, getSession } from "@/api/auth";
import { telReg } from "@/config";
import { timing } from "@/api/utils";
export default {
  name: "Login-register",
  data() {
    return {
      imgSrc: "",
      btnDisabled: 0,
      btnValue: "发送短信验证码",
      params: {
        mobile: "",
        imgCode: "",
        smsCode: "" //手机验证码
      }
    };
  },
  watch: {
    "params.mobile"(val) {
      console.log(val);
      if (val.length > 0 && this.btnDisabled != 2) {
        this.btnDisabled = 1;
      } else if (val.length == 0) {
        this.btnDisabled = 0;
      }
    }
  },
  mounted() {
    // 获取图形验证码
    this.getNewImgCode();
  },
  computed: {
    disabledCls() {
      var conf = ["disabled", "", "timing"];
      return conf[this.btnDisabled];
    }
  },
  methods: {
    sendSms() {
      if (this.btnDisabled != 1) return;
      if (!telReg.test(this.params.mobile)) {
        Toast("手机号不合法");
        return;
      }
      if (this.params.imgCode.length == 0) {
        Toast("图形验证码未填");
        return;
      }
      let { mobile, imgCode } = this.params;
      let verifyCodeToken = getSession("verifyCodeToken");
      this.$http
        .post("fanxing-api/v1/user/register/step1", {
          mobile: mobile,
          imageCode: imgCode,
          verifyCodeToken
        })
        .then(({ bstatus }) => {
          console.log(bstatus);
          if (bstatus.code == 0) {
            Toast("短信发送成功");
            timing(
              { maxTime: 60, disTime: 1 },
              time => {
                // console.log(time);
                this.btnDisabled = 2;
                this.btnValue =
                  '<font color="#0ABC8">' + time + "s</font> 重新获取";
              },
              () => {
                this.btnValue = "发送短信验证码";
                this.btnDisabled = 1;
              }
            );
          } else if (bstatus.code == 2001) {
            Toast(bstatus.msg);
          } else {
            this.btnDisabled = 1;
          }
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
              this.$router.push({ path: "/login/register" ,query:{
                  identifyAuthCode: data.identifyAuthCode
              }});
            }, 2000);
          } else{
            Toast(bstatus.msg); 
          }
        });
    }
  }
};
</script>

