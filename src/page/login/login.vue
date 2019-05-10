<template>
  <div>
    <ul>
      <li>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="username"
        >
      </li>
      <li>
        <input
          type="text"
          placeholder="请输入密码"
          v-model="password"
        >
      </li>
      <li class="clear">
        <p class="fl">
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="vevifyCode"
          >
        </p>
        <img
          class="fl"
          :src="imgSrc"
          @click="getNewImgCode"
        >
      </li>
      <li>
        <button @click="login">登录</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { setSession, getSession } from "@/api/session";
import { Toast } from "mint-ui";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      username: "",
      password: "",
      vevifyCode: "",
      imgSrc: ""
    };
  },
  mounted() {
    // 获取图形验证码
    this.getNewImgCode();
  },
  methods: {
    getNewImgCode() {
      var timestamp = new Date().getTime(); // 时间戳
      setSession("verifyCodeToken", timestamp);
      this.imgSrc =
        "/fanxing-api/v1/user/imageCode?verifyCodeToken=" + timestamp;
    },
    login() {
      let { username, password, vevifyCode } = this;
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
            Cookies.set("userinfo", JSON.stringify(data.user));
            Toast({
              message: "登录成功",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({ path: "/home" });
            }, 2000);
          },
          () => {}
        );
    }
  }
};
</script>
