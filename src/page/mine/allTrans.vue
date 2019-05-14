<template>
  <div id="allTrans">
    <ul>
      <li
        v-for="(item,index) in allTransList"
        :key="index"
      >
        <div class="status flex"><span>{{item.transStatusDesc}}</span><span>支付时间: {{item.successTimeToShow}}</span></div>
        <p>订单编号: {{item.transId}}</p>
        <p class="flex msg">
          <span>商品信息: {{item.orderName}} </span>
          <span>支付金额: {{item.priceAmount}} {{item.priceCurrency}}</span>
        </p>
        <p>会员有效期: {{item.effectiveTimeToShow}} - {{item.expireTimeToShow}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTransList: []
    };
  },
  mounted() {
    this.getAllTransList();
    //   this.formData()
  },
  computed: {
    // formData(timeStamp) {
    //   let timestamp4 = new Date(timeStamp);
    //   timestamp4 = (
    //     timestamp4.toLocaleDateString().replace(/\//g, "/") +
    //     " " +
    //     timestamp4.toTimeString().substr(0, 8)
    //   ).split(" ")[0];
    //   console.log(timestamp4);
    // }
  },
  methods: {
    formData(timeStamp) {
      let timestamp4 = new Date(timeStamp);
      timestamp4 = (
        timestamp4.toLocaleDateString().replace(/\//g, "/") +
        " " +
        timestamp4.toTimeString().substr(0, 8)
      ).split(" ")[0];
      console.log(timestamp4);
    },
    getAllTransList() {
      this.$http
        .post("/fanxing-api/v1/trans/list", {})
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            if (data.totalCount > 0) {
              this.allTransList = data.list;
              this.isTrans = false;
            } else {
              this.isTrans = true;
            }
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
#allTrans {
  margin-top: 0.44rem;
  width: 100%;
  height: 100%;
  background: #fff;
  ul {
    padding: 0.05rem 0.32rem 0;
    li {
        margin-top: 0.28rem;
        border-bottom: 1px solid #ededed;
      .status {
        height: 0.2rem;
        line-height: 0.2rem;
        margin-bottom: 0.14rem;
        justify-content: space-between;
        span:first-child {
          font-family: PingFangSC-Medium;
          font-size: 0.14rem;
          color: #239df2;
        }
        span:last-child {
          font-size: 0.1rem;
          color: #999999;
        }
      }
      p {
        margin-bottom: 0.11rem;
        font-size: 0.12rem;
        color: #666666;
        &.msg {
          justify-content: space-between;
        }
      }
    }
  }
}
</style>



