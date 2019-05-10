<template>
  <div id="member">
    <ul class="flex">
      <li
        v-for="(item,index) in list"
        :key="index"
      >
        <p>{{item.title}}</p>
        <p>{{item.price}}</p>
        <label><input
            name="buyer"
            type="radio"
            value=""
          />立即购买 </label>
      </li>
    </ul>
    <div>
      <p>支付方式</p>
    </div>
    <div>
      <p>订单信息</p>
      <p>充值账号:{{name}}</p>
      <p>会员类型: 6个月VIP会员</p>
      <p>支付金额: 160</p>
    </div>
    <button class="button button-big" @click="goRecharge">立即支付</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
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
    goRecharge(){
      this.$http
        .post("/fanxing-api/v1/member/recharge", {})
        .then(({ bstatus, data }) => {
          this.$nextTick(()=>{
              document.pay_form.submit();
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
#member {
  .flex {
    flex-wrap: wrap;
    li {
      width: 50%;
    }
  }
}
</style>


