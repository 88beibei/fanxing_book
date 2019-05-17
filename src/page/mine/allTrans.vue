<template>
  <div id="allTrans">
    <MineBlank v-if="isBlank"></MineBlank>
    <ul 
      v-infinite-scroll="loadMore2"
      infinite-scroll-distance="50"
      infinite-scroll-immediate-check= false
      infinite-scroll-disabled="loading"
      v-else>
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
      <div v-show="loading" class="loading">
      加载中...
    </div>
    </ul>
     <!-- {{formData(11111111111111)}} -->
  </div>
</template>
<script>
import MineBlank from "@/page/mine/blank";
import { InfiniteScroll } from "mint-ui";
export default {
    components: {
        MineBlank
    },
  data() {
    return {
      allTransList: [],
      isBlank: false,
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      loading: false,
    };
  },
  mounted() {
    this.getAllTransList();
  },
  computed: {
  },
  methods: {
    // 上拉加载更多
    loadMore2(){
        if(this.currentPage < this.totalCount){
          this.currentPage +=1;
          this.getAllTransList();
          this.loading = true;
          setTimeout(()=>{
              this.loading = false
          },3500)
        }
    },
    formData(timeStamp) {
      let timestamp4 = new Date(timeStamp);
      return timestamp4 = (
        timestamp4.toLocaleDateString().replace(/\//g, "/") +
        " " +
        timestamp4.toTimeString().substr(0, 8)
      ).split(" ")[0];
      console.log(timestamp4);
     
    },
    getAllTransList() {
      let {currentPage,pageSize} = this;
      this.$http
        .post("/fanxing-api/v1/trans/list", {
          currentPage,
          pageSize
        })
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            if (data.totalCount > 0) {
               this.isBlank = false;
              this.totalCount = Math.ceil(data.totalCount/this.pageSize);
              this.allTransList = this.allTransList.concat(data.list);
              console.log(this.totalCount)
              console.log('length',this.allTransList.length);
            } else {
              this.isBlank = true;
            }
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
#allTrans {
  width: 100%;
  height: 100%;
  ul {
    padding: 0.4rem 0.32rem 0;
    background: #fff;
    // height: 100%;
    // box-sizing: border-box;
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
  .loading{
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    background: #fff;
    transition: 0.3s;
  }
}
</style>



