<template>
  <div id="paySuccess">
    <div class="content">
      <div class="tip">
        <span class="iconfont icon-chenggong"></span>
        <p class="txt">支付成功</p>
      </div>
      <div class="clear">
        <button class="button button-normal fl btn1" @click="goHome">回首页</button>
        <button
        class="button button-normal btn2 fl"
        @click="sure"
      >确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header";
import Cookies from "js-cookie";
export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  mounted() {
    // this.getMember();
  },
  methods: {
    goHome(){
      this.$router.push('/home')
    },
    getMember() {
      this.$http.post("/fanxing-api/v1/user/detail", {}).then(({ data }) => {
        let userinfo = JSON.parse(Cookies.get("userinfo"));
        userinfo.userStatus = data.userStatus;
        Cookies.set("userinfo", JSON.stringify(userinfo));
      });
    },
    sure() {
      let goBeforeMember = localStorage.getItem("toMemberPath") || "/home";
      let navList = ["/home", "/bookrack", "/mine"];

      let index = navList.indexOf(goBeforeMember);
      index = index !== -1 ? index : 0;
      let bookId = localStorage.getItem("user_bookId");
      this.$router.push({ path: goBeforeMember, query: { bookId, index } });
    }
  }
};
</script>
<style lang="less" scoped>
#paySuccess {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  .content{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 3.35rem;
    height: 2.5rem;
    background: #fff; 
    .btn1{
      background: #FFFFFF;
      box-shadow: 0 2px 4px 1px rgba(197,197,197,0.50);
      border-radius: 2px;
      font-family: PingFangSC-Medium;
      font-size: 0.14rem;
      color: #666666;
      margin: 0 0.17rem 0 0.19rem;
    }
    .btn2{
      box-shadow: 0 2px 4px 1px rgba(197,197,197,0.50);
      border-radius: 2px;
      font-family: PingFangSC-Medium;
      font-size: 0.14rem;
      color: #FFFFFF;
    }
  }
  .tip {
    color: #239df2;
    text-align: center;
    margin-bottom: 0.54rem;
    span {
      font-size: 0.49rem;
      margin: 0.39rem 0 0.24rem;
    }
    .txt {
      font-size: 0.2rem;
      color: #239DF2;
    }
  }
  // .btn {
  //   border-radius: 2px 4px 4px 4px;
  //   margin-top: 1.92rem;
  // }
}
</style>


