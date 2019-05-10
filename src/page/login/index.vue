<template>
  <div>
    <div>
      <!-- <router-link
        class='link'
        tag='p'
        to='/home'
      >图标</router-link> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapActions } from 'vuex';
import { setSession, getSession } from "@/api/session";
import { sendSmsUrl, loginByCodeUrl, telReg } from "@/config";
import { timing } from "@/api/utils";
export default {
  name: "Login-index",
  components: {},
  data() {
    return {
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
  padding: 0.18rem 0.2rem;
  .link {
    color: @color2;
    font-size: @anoFontsize;
    line-height: @mainFontsize;
    margin-top: 0.06rem;
    margin-bottom: 0.3rem;
  }
}
</style>