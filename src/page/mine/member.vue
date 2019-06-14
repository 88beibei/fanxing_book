<template>
  <div id="member">
    <Header2 :title="title"></Header2>
    <p class="product">会员套餐</p>
    <ul>
      <li v-for="(item,index) in productList"
          :key="index"
          :class="{'flex': true, isChecked: (index==(productId-1))}"
          @click="checkPrice(item.productId)">
        <p>{{item.productName}}</p>
        <p>{{item.productPrice}} {{item.productCurrency}}</p>

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
      <p><span>会员类型:</span><span>{{productList.length ? productList[productId-1].productName : ''}}</span></p>
      <p><span>支付金额:</span><span>{{productList.length ? productList[productId-1].productPrice : ''}} {{productList.length ? productList[0].productCurrency : ''}}</span></p>
    </div>
    <button class="button button-big btn"
            @click="goRecharge">立即支付</button>
    <div v-html="content"></div>
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
      productList: [],
      productId: 1,
    };
  },
  mounted() {
    // let { name } = this.$route.query;
    // this.name = name;
    this.getProductList();
    this.getUserDetail();
  },

  methods: {
    checkPrice(productId) {
      this.productId = productId;
    },
    goRecharge() {
      this.$http
        .post("/fanxing-api/v1/member/recharge", {
          productId: this.productId,
        })
        .then(({ bstatus, data }) => {
          this.content = data.html;
          this.$nextTick(() => {
            document.pay_form.submit();
          });
        });
    },
    getUserDetail() {
      this.$http
        .post("/fanxing-api/v1/user/detail", {})
        .then(({ status, data }) => {
          this.name = data.name;
          // console.log(data.name);
        });
    },
    getProductList() {
      this.$http
        .post("/fanxing-api/v1/product/list", {})
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            this.productList = data.list;
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#member {
  width: 100%;
  // height: 100%;
  background: #fff;
  padding-bottom: 0.2rem;
  // box-sizing: border-box;
  .product {
    padding-top: 0.64rem;
    font-family: PingFangSC-Medium;
    font-size: 0.18rem;
    color: #333333;
    margin: 0 0 0.12rem 0.25rem;
  }
  ul {
    box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.5);
    border-radius: 2px;
    margin: 0 0.2rem;
    li {
      height: 0.6rem;
      line-height: 0.6rem;
      // margin: 0 0.2rem;
      padding: 0 0.19rem;
      border: 2px solid #fff;
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
      &.isChecked {
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
      margin: 0.25rem 0 0.12rem 0.25rem;
    }
    .tip {
      width: 1.22rem;
      height: 0.4rem;
      line-height: 0.4rem;
      margin-left: 0.2rem;
      box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.5);
      border-radius: 2px;
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
    p {
      margin-left: 0.25rem;
      font-size: 0.14rem;
      color: #666666;
      margin-bottom: 0.04rem;
      span {
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
  .btn {
    margin-top: 0.5rem;
  }
}
</style>


