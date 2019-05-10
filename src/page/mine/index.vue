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
        <p>{{isMember}}</p>
      </li>
    </ul>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/footer";
import Header from "@/components/header";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      name: "156",
      isMember: "会员"
    };
  },
  mounted() {},
  methods: {
    getUserDetail(){
      this.$http.post('/fanxing-api/v1/user/detail')
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


