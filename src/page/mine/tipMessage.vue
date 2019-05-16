<template>
  <div id="tipMsg">
    <div class="tip">
        <span class="iconfont icon-icon-test"></span>
        <p class="txt">建议使用手机浏览器,支付、阅读更流畅~</p> 
    </div>
    <button class="button button-big btn" @click="goHome">继续使用</button>
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
    sessionStorage.setItem("user_tip",1);
  },
  methods: {
    getMember(){
      this.$http.post('/fanxing-api/v1/user/detail',{}).then(({data})=>{
            let userinfo = JSON.parse(Cookies.get("userinfo"));
            userinfo.userStatus = data.userStatus;
            Cookies.set("userinfo",JSON.stringify(userinfo));
      })
    },
    goHome(){
        // alert('123456')
        // location.href="https://develop-test.ipaynow.cn/#/home";
        // this.$router.push({ path: '/home',query:{tip:1}});
        this.$router.push({ path: '/home'});
    }
  }
};
</script>
<style lang="less" scoped>
#tipMsg{
  width: 100%;
  height: 100%;
  background: #fff;
  .tip{
     text-align: center;
     span{
       font-size: 0.6rem;
       color: #FE8C5B;
       margin: 1.65rem 0 0.38rem;
     }
    .txt{
     font-size: 0.14rem;
     color: #999999;
    }
    
  }
  .btn{
      margin-top: 1.95rem;
      background: #FFFFFF;
      box-shadow: 0 2px 4px 1px rgba(197,197,197,0.50);
      border-radius: 2px;
      font-family: PingFangSC-Medium;
      font-size: 0.14rem;
      color: #666666;
    }
}
</style>


