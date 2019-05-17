<template>
  <div class="set-pwd">
    <div class="register-content">
      <ul class="register-input">
        <li class="register-pwd">
          <input type="password" class="pwd" placeholder="请设置登录密码(支持8-20位数字、字母)" v-model="passWord">
        </li>
        <li class="register-pwd">
          <input type="password" placeholder="请重复输入登录密码(支持8-20位数字、字母)" v-model="repeatPassWord">
        </li>
      </ul>
      <div class="confirm-btn">
        <button @click="setPassword" :class="{disabled: isDisabled}">确认</button>
      </div>
      <p class="go-logo"><span>已有账号？</span><router-link to="/login/login">立即登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import md5 from "js-md5";
export default {
  data() {
    return {
      identifyAuthCode: "",
      passWord: "",
      repeatPassWord: "",
      isDisabled: false,
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
        Toast("请输入8-20位（数字、字母 ）密码");
        return;
      } else if (!passwordReg.test(this.passWord)) {
        Toast("请输入8-20位（数字、字母 ）密码");
        return;
      }

      if (this.repeatPassWord.length == 0) {
        Toast("请重复输入8-20位（数字、字母 ）密码");
        return;
      } else if (!passwordReg.test(this.repeatPassWord)) {
        Toast("请重复输入8-20位（数字、字母 ）密码");
        return;
      }


      if (this.passWord == this.repeatPassWord) {
        let { identifyAuthCode, passWord, repeatPassWord } = this;
        passWord = md5(passWord);
        repeatPassWord = md5(repeatPassWord);
        this.isDisabled = true;
        setTimeout(()=>{
            this.isDisabled = false;
        },10000)
        this.$http
          .post("/fanxing-api/v1/user/register/step3", {
            identifyAuthCode:identifyAuthCode,
            passWord,
            repeatPassWord
          })
          .then(({ bstatus }) => {
            if (bstatus.code == 0) {
              Toast({
                message: "注册成功",
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
        Toast("二次输入密码不匹配，请确认后重新输入");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.set-pwd {
  padding: 0.4rem 0.2rem 1.02rem;
  input {
    padding: 0.13rem;
    border: 1px solid #ededed;
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 0.15rem;
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
      &.disabled{
        pointer-events: none;
        background: #999;
      }
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
