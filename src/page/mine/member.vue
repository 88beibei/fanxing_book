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
      <div>
        <span class="iconfont icon-yinlianzhifu"></span>
        <span>银联支付</span>
      </div>
    </div>
    <div>
      <p>订单信息</p>
      <p>充值账号:{{name}}</p>
      <p>会员类型: 6个月VIP会员</p>
      <p>支付金额: 160</p>
    </div>
    <div v-html="content"></div>
    <button
      class="button button-big"
      @click="goRecharge"
    >立即支付</button>
  </div>
</template>

<script>
import Header2 from "@/components/header2";
export default {
  components: {
    Header2
  },
  data() {
    return {
      name: "",
      content: "",
      title: "开通会员",
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
  .payName{
    font-family: PingFangSC-Medium;
    font-size: 0.18rem;
    color: #333333;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
  }
}
</style>


