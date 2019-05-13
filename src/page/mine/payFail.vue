<template>
  <div id="paySuccess">
    <div class="tip">
        <span class="iconfont icon-shibai"></span>
        <p class="txt">支付失败</p> 
    </div>
    <button class="button button-big btn" @click="payTwo">重新下单</button>
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
    payTwo(){
      this.$router.push({ name: 'member'});
    }
  }
};
</script>
<style lang="less" scoped>
#paySuccess{
  .tip{
     color: #FE4A41;
     text-align: center;
     span{
       font-size: 0.6rem;
       margin: 1.65rem 0 0.28rem;
     }
    .txt{
      font-size: 0.24rem;
      font-family: PingFangSC-Regular;
    }
    
  }
  .btn{
      border-radius: 2px 4px 4px 4px;
      margin-top: 1.92rem;
    }
}
</style>


