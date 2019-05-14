<template>
  <div id='bookrack-index'>
    <Header></Header>
    <BlankRack :isShow='isShow'></BlankRack>
    <BookList :list="bookItems" :memCode="isMemberCode" @deleteItem="deleteItem"></BookList>
    <Footer></Footer>
  </div>
</template>
<script>
import Toast from "mint-ui";
import BlankRack from "@/page/bookRack/blank";
import BookList from "@/page/bookRack/bookList";
import Footer from "@/components/footer";
import Header from "@/components/header";
export default {
  data() {
    return {
      isShow: false,
      currentPageNum: 1,
      currentPageSize: 10,
      bookItems: '',
      isMemberCode: ''
    };
  },
  components: {
    BlankRack,
    BookList,
    Footer,
    Header,
  },
  mounted() {
      this.getbookshelf();
      this.getUserDetail();
      
  },
  methods: {
    // 获取书架列表内容
    getbookshelf() {
      let { currentPageNum, currentPageSize } = this;
      this.$http.post("/fanxing-api/v1/bookshelf/list", {
        currentPageNum,
        currentPageSize
      }).then(({bstatus,data})=>{
          if(data.totalCount > 0){ // 书架有图书
                  this.isShow = false;
                  this.bookItems = data.bookItems
              }else{
                  this.isShow = true
              }
      })
    },
    // 获取用户信息
    getUserDetail() {
      this.$http
        .post("/fanxing-api/v1/user/detail", {})
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            this.isMemberCode = data.userStatus
            console.log(data.userStatus)
          }
        });
    },
    // 删除图书
    deleteItem({index,shelfId}){
      // console.log( shelfId)
      this.bookItems.splice(index, 1);
      if(!this.bookItems.length){
        this.isShow = true;
      }
      this.$http.post('/fanxing-api/v1/bookshelf/delete',{
        shelfId
      }).then(({bstatus,data})=>{
        if(bstatus.code == 0){
          Toast("删除成功")
        }else{
          Toast(bstatus.msg)
        }
      })
    }
  }
};
</script>

