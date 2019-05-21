<template>
  <div id="login-index">
      <router-link class="logo" to="/home">
        <img :src="imgSrc" alt="">
      </router-link>
     <router-view></router-view>
  </div>
</template>

<script>
// import { mapMutations, mapActions } from 'vuex';
import { setSession, getSession } from "@/api/auth";
import { sendSmsUrl, loginByCodeUrl, telReg } from "@/config";
import { timing } from "@/api/utils";
import imgSrc from "@/images/logoblue.png";
export default {
  name: "Login-index",
  components: {},
  data() {
    return {
      imgSrc,
      btnDisabled: 0,
      btnValue: "获取验证码",
      params: {
        userPhone: "",
        verificationCode: ""
      }
    };
  },
  mounted() {},
  watch: {
    "params.userPhone"(val) {
      if (val.length > 0 && this.btnDisabled != 2) {
        this.btnDisabled = 1;
      } else if (val.length == 0) {
        this.btnDisabled = 0;
      }
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
#login-index {
  width: 100%;
  height: 100%;
  padding-bottom: 0.5rem;
  text-align: center;
  background: #fff;
  box-sizing: border-box;
  .logo{
    // margin-top: 0.8rem;
    margin-top: 1rem;
    img{
      width: 2rem;
      height: 0.64rem;
    }
  }
}
</style>