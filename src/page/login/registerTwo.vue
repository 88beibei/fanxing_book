<template>
  <div>
    <ul>
      <li><input
          type="text"
          placeholder="请设置登录密码(支持8-20位数字字母)"
          v-model="passWord"
        ></li>
      <li><input
          type="text"
          placeholder="请重复输入登录密码(支持8-20位数字字母)"
          v-model="repeatPassWord"
        ></li>
      <li><button @click="setPassword">确定</button></li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      identifyAuthCode: "",
      passWord: "",
      repeatPassWord: ""
    };
  },
  mounted() {
    let { identifyAuthCode } = this.$route.query;
    this.identifyAuthCode = identifyAuthCode;
  },
  methods: {
    setPassword() {
      let passwordReg = /^[0-9A-Za-z]{8,20}$/;
      if (this.passWord.length == 0) {
        Toast("请输入密码");
        return;
      } else if (!passwordReg.test(this.passWord)) {
        Toast("请输入8-20位数字字母");
        return;
      }

      if (this.passWord == this.repeatPassWord) {
        let { identifyAuthCode, passWord, repeatPassWord } = this;
        this.$http
          .post("/fanxing-api/v1/user/register/step3", {
            identifyAuthCode,
            passWord,
            repeatPassWord
          })
          .then(({ bstatus }) => {
            console.log(bstatus);
            if (bstatus.code == 0) {
              Toast({
                message: "操作成功",
                iconClass: "icon icon-success",
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({ path: "/login/login" });
              }, 2000);
            } else {
              Toast(bstatus.msg);
            }
          });
      } else {
        Toast("两次输入的密码不一致");
      }
    }
  }
};
</script>

