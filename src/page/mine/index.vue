<template>
  <div id="mine">
    <Header></Header>
    <ul>
      <li>
        <div class="flex">
          <span class="iconfont icon-zhanghu icn"></span>
          <p>账户号: {{name}}</p>
        </div>
      </li>
      <li>
        <div class="flex line">
          <span class="iconfont icon-huiyuan icn"></span>
          <p
            v-if="userStatus==1"
            class="clear"
            @click="goPay"
          >
            <span class="fl"> 会员截止日期: {{expireTimeStr}} </span>
            <span class="iconfont icon-xiayibu nextIcn fr"></span>
            <span class="fr pay">续费</span>
          </p>
          <p
            v-else
            @click="goMember"
            class="noMember clear"
          >
            <span class="fl">立即开通会员,免费获取更多电子书资源</span>
            <span class="iconfont icon-xiayibu nextIcn fr"></span>
          </p>
        </div>

      </li>
      <li>
        <div class="flex line">
          <span  class="iconfont icon-dingdanjilu icn"></span>
          <p class="clear" @click="goTrans">
             <span class="fl">订单记录</span>
             <span class="iconfont icon-xiayibu nextIcn fr"></span>
          </p>
        </div>
      </li>
        <li>
        <div class="flex line">
          <span class="iconfont icon-wentifankui icn"></span>
          <p
            class="qus clear"
            @click="goFeedback"
          >
            <span class="fl">问题反馈</span>
            <span class="iconfont icon-xiayibu nextIcn fr"></span>
          </p>
        </div>

      </li>
      <li>
        <div class="flex line">
          <span class="iconfont icon-tuichu icn"></span>
          <p
            class="exit clear"
            @click="exit"
          >
            <span class="fl">退出</span>
            <span class="iconfont icon-xiayibu nextIcn fr"></span>
          </p>
        </div>

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
    // 问题反馈
    goFeedback(){
      this.$router.push({path: '/feedback'})
    },
    goTrans(){
      this.$router.push({path: '/transList/allTrans'})
    },
    goPay() {
      this.$router.push({ name: "member" ,query:{name:this.name}});
    },
    getUserDetail() {
      this.$http
        .post("/fanxing-api/v1/user/detail", {})
        .then(({ bstatus, data }) => {
          let { name, userStatus, expireDate } = data;
          this.name = name;
          this.userStatus = userStatus;
          this.expireTimeStr = expireDate;
        });
    },
    goMember() {
      this.$router.push({ name: "member", query: { name: this.name } });
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
      background: #fff;
      .icn {
        color: #239df2;
        font-size: 0.22rem;
        // margin-left: 0.21rem;
      }
      p {
        font-size: 0.14rem;
        color: #666666;
        margin-left: 0.22rem;
        flex: 1;
        &.noMember {
          color: #239df2;
        }
        .nextIcn {
          font-size: 0.1rem;
          color: #b1b1b1;
          // margin-right: 0.2rem;
        }
        .pay {
          margin-right: 0.08rem;
          font-size: 0.12rem;
          color: #666666;
        }
      }
      &:nth-child(1) {
        padding: 0.75rem 0 0.29rem 0.21rem;
        margin-bottom: 0.13rem;
      }
      &:nth-child(4){
        .icn{
          // font-size: 0.21rem;
        }
      }
      &:nth-child(5) {
        .icn {
          font-size: 0.19rem;
        }
      }
      .line {
        padding: 0.2rem 0;
        height: 0.22rem;
        line-height: 0.22rem;
        margin-left: 0.21rem;
        margin-right: 0.2rem;
        border-bottom: 1px solid #ededed;
      }
    }
  }
}
</style>


