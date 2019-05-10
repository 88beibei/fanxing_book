<template>
  <div>
    <Header></Header>
    <div style="margin-top:1rem">
        支付成功页面
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
    this.getMember();
  },
  methods: {
    getMember(){
      this.$http.post('/fanxing-api/v1/user/detail',{}).then(({data})=>{
            let userinfo = JSON.parse(Cookies.get("userinfo"));
            userinfo.userStatus = data.userStatus;
            Cookies.set("userinfo",JSON.stringify(userinfo));
      })
    }
  }
};
</script>

