<template>
  <div id="paySuccess">
    <div class="tip">
      <span class="iconfont icon-chenggong"></span>
      <p class="txt">修改成功</p>
    </div>
    <button
      class="button button-big btn"
      @click="goLogin"
    >返回登录</button>
    <p class="tim">{{time}}S后系统自动跳转登录页面</p>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      time: 5,
      timer: null,
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
      // let timer = null;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.time -= 1;
        if(this.time <=0){
            clearInterval(this.timer);
            this.$router.push("/login/login");
        }
      }, 1000);
    }
  },
  destroyed () {
      clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#paySuccess {
  width: 100%;
  // height: 100%;
  background: #fff;
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
    // margin-top: 0.2rem;
    padding: 0.2rem 0;
  }
}
</style>


