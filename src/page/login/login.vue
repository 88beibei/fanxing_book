<template>
  <div id="login">
    <div class="register-content">
      <ul class="register-input">
        <li class="register-pwd">
          <input type="text" placeholder="请输入手机号" v-model="username">
        </li>
        <li class="register-pwd"  style="margin-bottom:0;">
          <input type="password" placeholder="请输入密码" v-model="password">
        </li>
        <li class="clear">
          <!-- <input class="fl" type="text" placeholder="请输入验证码" v-model="vevifyCode">
          <img class="fr auth-code" :src="imgSrc" @click="getNewImgCode"> -->
          <router-link to='/login/forgetpwd' class="fr forget-pwd">忘记密码</router-link>
        </li>
      </ul>
      <div class="confirm-btn">
        <button @click="login">登录</button>
      </div>
      <p class="go-logo">
        <span>还没有账号？</span>
        <router-link to="/login/index">立即注册</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { setSession, getSession } from "@/api/auth";
import { Toast } from "mint-ui";
import { telReg } from "@/config";
import Cookies from "js-cookie";
import md5 from "js-md5";
export default {
  data() {
    return {
      username: "",
      password: "",
      vevifyCode: "",
      imgSrc: "",
      path: "",
    };
  },
  mounted() {
    // 获取图形验证码
    // this.getNewImgCode();
    this.path = this.$route.query.redirect
  },
  methods: {
    getNewImgCode() {
      var timestamp = new Date().getTime(); // 时间戳
      setSession("verifyCodeToken", timestamp);
      this.imgSrc =
        "/fanxing-api/v1/user/imageCode?verifyCodeToken=" + timestamp;
    },
    login() {
      if (!telReg.test(this.username)) {
        Toast("手机号码格式错误，请重新输入");
        return;
      }
      // if (this.vevifyCode.length !==4 ) {
      //   Toast("图片验证码错误，请重新输入");
      //   return;
      // }
      let { username, password, vevifyCode } = this;
      password = md5(password);
      let verifyCodeToken = getSession("verifyCodeToken");
      this.$http
        .post("/fanxing-api/v1/user/login", {
          username,
          password,
          verifyCodeToken,
          vevifyCode
        })
        .then(
          ({ bstatus, data }) => {
            // console.log(data.user)
            Cookies.set("userinfo", JSON.stringify(data.user));
            Toast({
              message: "登录成功",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({ path: "/home" });
            }, 2000);
          },
          () => {
            // this.getNewImgCode();
            // this.vevifyCode = ''; 
          }
        );
    },
    goHome(){
      this.$router.push({name: 'home'})
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  padding: 0.4rem 0.2rem 0;
  input {
    padding: 0.13rem;
    border: 1px solid #ededed;
    border-radius: 2px;
    box-sizing: border-box;
    // height: 0.44rem;
    font-size: 0.15rem;
  }
  .register-input {
    margin-bottom: 1.17rem;
    .clear {
      input {
        width: 65%;
      }
      .forget-pwd {
        // font-size: 0.12rem;
        color: #b4b4b4;
        line-height: 0.4rem;
      }
    }
    .auth-code {
      width: 30%;
      height: 0.44rem;
    }
    .register-pwd {
      width: 100%;
      margin-bottom: 0.2rem;
      input {
        width: 100%;
      }
    }
  }
  .confirm-btn {
    button {
      width: 100%;
      height: 0.4rem;
      background: #239df2;
      font-size: 16px;
      color: #ffffff;
      font-weight: 600;
      border-radius: 3px;
    }
  }
  .go-logo {
    text-align: center;
    margin-top: 0.2rem;
    // font-size: 12px;
    color: #c4c4c4;
    a {
      color: #619ffe;
    }
  }
}
</style>