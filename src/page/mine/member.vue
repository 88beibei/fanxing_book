<template>
  <div id="member">
    <Header2 :title="title"></Header2>
    <ul>
      <li
        v-for="(item,index) in list"
        :key="index"
        class="flex"
      >
        <p>{{item.title}}</p>
        <p>¥{{item.price}}</p>

      </li>
    </ul>
    <div class="payName">
      <p>支付方式</p>
      <div class="tip">
        <img :src="imgSrc" />
        <span>银联支付</span>
      </div>
    </div>
    <div class="payInfo">
      <p>订单信息</p>
      <p><span>充值账号: </span><span>{{name}}</span></p>
      <p><span>会员类型:</span><span>1个月VIP会员</span></p>
      <p><span>支付金额:</span><span>¥30</span></p>
    </div>
    <div v-html="content"></div>
    <button
      class="button button-big btn"
      @click="goRecharge"
    >立即支付</button>
  </div>
</template>

<script>
import Header2 from "@/components/header2";
import imgSrc from "@/images/paycard.png";
export default {
  components: {
    Header2
  },
  data() {
    return {
      name: "",
      content: "",
      title: "开通会员",
      imgSrc: imgSrc,
      list: [
        { title: "1个月VIP会员", price: 30 },
        { title: "3个月VIP会员", price: 80 },
        { title: "6个月VIP会员", price: 160 },
        { title: "1年VIP会员", price: 320 }
      ]
    };
  },
  mounted() {
    let { name } = this.$route.query;
    this.name = name;
  },
  methods: {
    goRecharge() {
      this.$http
        .post("/fanxing-api/v1/member/recharge", {})
        .then(({ bstatus, data }) => {
          this.content = data.html;
          this.$nextTick(() => {
            document.pay_form.submit();
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
#member {
  padding-top: 0.64rem;
  ul {
    li {
      height: 0.6rem;
      line-height: 0.6rem;
      margin: 0 0.2rem;
      padding: 0 0.19rem;
      &.flex {
        justify-content: space-between;
      }
      p:first-child {
        font-size: 0.14rem;
        color: #333333;
      }
      p:last-child {
        font-size: 0.14rem;
        color: #239df2;
      }
      &:first-child {
        border: 2px solid #239df2;
        border-radius: 2px 2px 0 0;
      }
    }
  }
  .payName {
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.18rem;
      color: #333333;
      // margin-top: 0.25rem;
      // margin-left: 0.25rem;
      margin: 0.25rem 0 0.12rem 0.25rem;
    }
    .tip {
      width: 1.22rem;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-left: 0.2rem;
      img {
        width: 0.29rem;
        height: 0.18rem;
        margin: 0 0.12rem 0 0.14rem;
      }
      span {
        font-size: 0.14rem;
        color: #333333;
      }
    }
  }
  .payInfo {
    p{
      margin-left: 0.25rem;
      font-size: 0.14rem;
      color: #666666;
      margin-bottom: 0.04rem;
      span{
        margin-right: 0.1rem;
      }
    }
    p:first-child {
      font-family: PingFangSC-Medium;
      font-size: 0.18rem;
      color: #333333;
      margin: 0.26rem 0 0.09rem 0.25rem;
    }
  }
  .btn{
    margin-top: 0.5rem;
  }
}
</style>


