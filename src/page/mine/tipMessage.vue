<template>
  <div id="tipMsg">
    <div class="tip">
        <span class="iconfont icon-icon-test"></span>
        <p class="txt">建议使用手机浏览器、支付、阅读更流畅~</p> 
    </div>
    <button class="button button-big btn" @click="goHome">确认</button>
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
    getMember(){
      this.$http.post('/fanxing-api/v1/user/detail',{}).then(({data})=>{
            let userinfo = JSON.parse(Cookies.get("userinfo"));
            userinfo.userStatus = data.userStatus;
            Cookies.set("userinfo",JSON.stringify(userinfo));
      })
    },
    goHome(){
        this.$router.push({name: 'home'})
    }
  }
};
</script>
<style lang="less" scoped>
#tipMsg{
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
      border-radius: 2px 4px 4px 4px;
      margin-top: 1.95rem;
    }
}
</style>


