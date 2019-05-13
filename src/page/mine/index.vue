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
        <p v-if="userStatus==1">
            会员截止日期: {{expireTimeStr}} 
            <!-- <span>续费</span> -->
        </p>
        <p
          v-else
          @click="goMember"
          class="noMember"
        >立即开通会员,免费获取更多电子书资源</p>
      </li>
      <li class="flex">
        <span class="iconfont icon-tuichu"></span>
        <p
          class="exit"
          @click="exit"
        >退出登录</p>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/footer";
import Header from "@/components/header";
import Cookies from "js-cookie";
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
    // let userinfo = Cookies.get("userinfo");
    // if (userinfo) {
    //   userinfo = JSON.parse(userinfo);
    //   console.log(userinfo);
    //   let { token, mobile, userStatus, expireTimeStr } = userinfo;
    //   if (token) {
    //     this.name = mobile;
    //     this.userStatus = userStatus;
    //     this.expireTimeStr = expireTimeStr;
    //   }
    // } else {
    //   this.$router.push("/login/login");
    // }
    this.getUserDetail();
  },
  methods: {
    getUserDetail() {
      this.$http
        .post("/fanxing-api/v1/user/detail", {})
        .then(({ bstatus, data }) => {
          let {name,userStatus,expireDate} = data
          this.name = name;
          this.userStatus = userStatus;
          this.expireTimeStr = expireDate;
        });
    },
    goMember() {
      this.$router.push({ name: "member" ,query:{name:this.name}});
    },
    exit() {
      this.$http.post("/fanxing-api/v1/user/logout", {}).then(res => {
        Cookies.set("userinfo", "");
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>
<style lang="less" scoped>
#mine {
  // padding-top: 0.75rem;
  ul {
    li {
      padding: 0.2rem 0;
      span {
        color: #239df2;
        font-size: 0.24rem;
        margin-left: 0.27rem;
      }
      p {
        font-size: 0.14rem;
        color: #999999;
        margin-left: 0.35rem;
        height: 0.25rem;
        line-height: 0.25rem;
        &.exit {
          flex: 1;
        }
        &.noMember{
          color: #239DF2;
        }
      }
      &:nth-child(1){
        padding-top: 0.75rem;
        padding-bottom: 0.38rem;
      }
      &:nth-child(3){
        span{
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>


