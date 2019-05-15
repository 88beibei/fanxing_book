<template>
  <div id="trans">
    <Header2 title="订单记录"></Header2>
    <!-- <ul class="transList clear">
      <router-link
        v-for="(item,index) in list"
        :to="item.path"
        :key="index"
        tag="li"
        class="fl"
      >{{item.title}}</router-link>
    </ul> -->
    <router-view></router-view>
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
      isTrans: false,
      transList: [],
    //   list: [{ title: "全部订单", path: "/transList/allTrans" }]
    };
  },
  mounted() {
    // 获取全部订单列表
    // this.getTransList();
  },
  methods: {
    // getTransList() {
    //   this.$http
    //     .post("/fanxing-api/v1/trans/list", {})
    //     .then(({ bstatus, data }) => {
    //       if (bstatus.code == 0) {
    //         if (data.totalCount > 0) {
    //           this.transList = data.list;
    //           this.isTrans = false;
    //         } else {
    //           this.isTrans = true;
    //         }
    //       }
    //     });
    // }
  }
};
</script>

<style lang="less" scoped>
#trans{
  width: 100%;
  height: 100%;
    .transList{
        // margin-top: 0.44rem;
        // margin: 0.44rem auto 0;
        margin: auto;
        li{
            width: 1.36rem;
            height: 0.29rem;
            line-height: 0.29rem;
            text-align: center;
            font-size: 0.12rem;
            border: 1px solid #239DF2;
            margin-top: 0.44rem;
            &:first-child{
                
            }
        }
    }
}
</style>


