<template>
  <div id="mine">
    <Header></Header>
    <ul>
      <li class="flex">
        <span class="iconfont icon-zhanghu"></span>
        <p>账户号: {{name}}</p>
      </li>
      <li class="flex">
        <span class="iconfont icon-huiyuan"></span>
        <p v-if="userStatus==1">会员截止日期: {{expireTimeStr}}</p>
        <p v-else @click="goMember">立即开通会员,免费获取更多电子书资源</p>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/footer";
import Header from "@/components/header";
import Cookies from 'js-cookie';
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      name: "",
      userStatus: "",
      expireTimeStr: ""
    };
  },
  mounted() {
    let userinfo = Cookies.get('userinfo');
    if(userinfo){
      userinfo = JSON.parse(userinfo);
      console.log(userinfo)
      let {token,mobile,userStatus,expireTimeStr} = userinfo
      if(token){
          this.name = mobile;
          this.userStatus = userStatus;
          this.expireTimeStr = expireTimeStr
      }
    }else{
      this.$router.push('/login/login')
    }
  },
  methods: {
    goMember(){
      this.$router.push({name: 'member'})
    }
  }
};
</script>
<style lang="less" scoped>
#mine {
  padding-top: 0.44rem;
  ul {
    li {
      padding: 0.27rem 0;
      span {
        color: #239df2;
        font-size: 0.25rem;
        margin-left: 0.27rem;
      }
      p {
        font-size: 0.14rem;
        color: #999999;
        margin-left: 0.35rem;
        height: 0.26rem;
        line-height: 0.26rem;
      }
    }
  }
}
</style>


