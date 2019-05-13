<template>
  <div class="set-pwd">
    <div class="register-content">
      <div class="logo">
        <span class="iconfont">&#xe606;</span>
        <span class="title">梵星网</span>
      </div>
      <ul class="register-input">
        <li class="register-pwd">
          <input type="password" class="pwd" placeholder="请设置登录密码(支持8-20位数字、字母)" v-model="passWord">
        </li>
        <li class="register-pwd">
          <input type="password" placeholder="请重复输入登录密码(支持8-20位数字、字母)" v-model="repeatPassWord">
        </li>
      </ul>
      <div class="confirm-btn">
        <button @click="setPassword">确认</button>
      </div>
      <p class="go-logo"><span>已有账号？</span><router-link to="/login/login">立即登录</router-link>
      </p>
    </div>
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
            identifyAuthCode:identifyAuthCode,
            passWord,
            repeatPassWord
          })
          .then(({ bstatus }) => {
            if (bstatus.code == 0) {
              Toast({
                message: "操作成功",
                // iconClass: "icon icon-success",
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
<style lang="less" scoped>
.set-pwd {
  height: 100%;
  background: #fff;
  padding: 1.3rem 0.2rem;
  .logo {
    text-align: center;
    font-size: 25.2px;
    color: #239df2;
    margin-bottom: 0.4rem;
  }
  input {
    padding: 0.13rem;
    border: 1px solid #ededed;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .register-input {
    margin-bottom: 1.2rem;
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
    font-size: 12px;
    color: #c4c4c4;
    a {
      color: #619ffe;
    }
  }
}
</style>
