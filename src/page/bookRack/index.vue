<template>
  <div id='bookrack-index'>
    <Header></Header>
    <BlankRack v-if='isShow'></BlankRack>
    <BookList
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check= false
      infinite-scroll-disabled="loading"
      :list="bookItems"
      :memCode="isMemberCode"
      :loading="loading"
      @deleteItem="deleteItem"
    ></BookList>
    <Footer></Footer>
  </div>
</template>
<script>
import BlankRack from "@/page/bookRack/blank";
import BookList from "@/page/bookRack/bookList";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toast, InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      isShow: false,
      currentPageNum: 1,
      currentPageSize: 10,
      bookItems: [],
      isMemberCode: "",
      totalPageSize: 0,
      loading: false
    };
  },
  components: {
    BlankRack,
    BookList,
    Footer,
    Header
  },
  mounted() {
    this.getbookshelf();
    this.getUserDetail();
  },
  methods: {
    // 上拉加载更多
     loadMore(){
      if(this.currentPageNum < this.totalPageSize){
        this.currentPageNum += 1;
         this.loading = true;
         setTimeout(()=>{
           this.getbookshelf();
           this.loading = false;
         },1500)
      }
    },
    // 获取书架列表内容
    getbookshelf() {
      let { currentPageNum, currentPageSize } = this;
      this.$http
        .post("/fanxing-api/v1/bookshelf/list", {
          currentPageNum,
          currentPageSize
        })
        .then(({ bstatus, data }) => {
          if (data.totalCount > 0) {
            // 书架有图书
            this.isShow = false;
            this.totalPageSize = data.totalPageSize;
            this.bookItems = this.bookItems.concat(data.bookItems);
            // console.log('length',this.bookItems.length)
          } else {
            this.isShow = true;
          }
        });
    },
    // 获取用户信息
    getUserDetail() {
      this.$http
        .post("/fanxing-api/v1/user/detail", {})
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            this.isMemberCode = data.userStatus;
            console.log(data.userStatus);
          }
        });
    },
    // 删除图书
    deleteItem({ index, shelfId }) {
      // console.log( shelfId)
      this.bookItems.splice(index, 1);
      if (!this.bookItems.length) {
        this.isShow = true;
      }
      this.$http
        .post("/fanxing-api/v1/bookshelf/delete", {
          shelfId
        })
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            Toast({
              message: "删除成功",
              duration: 1000
            });
          } else {
            Toast(bstatus.msg);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#bookrack-index {
  width: 100%;
  height: 100%;
  // padding-bottom: 0.49rem;
  // box-sizing: border-box;
}
</style>


