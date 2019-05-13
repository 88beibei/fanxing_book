<template>
  <div id="paySuccess">
    <div class="tip">
      <span class="iconfont icon-chenggong"></span>
      <p class="txt">注册成功</p>
    </div>
    <button
      class="button button-big btn"
      @click="goLogin"
    >立即登录</button>
    <p class="tim">{{time}}S后系统自动跳转登录页面</p>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      time: 5
    };
  },
  mounted() {
      this.goLoginAuto()
  },
  methods: {
    goLogin() {
      this.$router.push("/login/login");
    },
    goLoginAuto() {
      let timer = null;
      clearInterval(timer);
      timer = setInterval(() => {
        this.time -= 1;
        if(this.time <=0){
            this.$router.push("/login/login");
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
#paySuccess {
  .tip {
    color: #239df2;
    text-align: center;
    span {
      font-size: 0.6rem;
      margin: 1.65rem 0 0.28rem;
    }
    .txt {
      font-size: 0.24rem;
      font-family: PingFangSC-Regular;
    }
  }
  .btn {
    border-radius: 2px 4px 4px 4px;
    margin-top: 1.92rem;
  }
  .tim {
    font-size: 0.12rem;
    color: #b4b4b4;
    text-align: center;
    line-height: 0.18rem;
    margin-top: 0.2rem;
  }
}
</style>


