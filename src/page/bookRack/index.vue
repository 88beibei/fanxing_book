<template>
  <div id='bookrack-index'>
    <BlankRack :isShow='isShow'></BlankRack>
    <BookList :list="bookItems" :memCode="isMemberCode" @deleteItem="deleteItem"></BookList>
  </div>
</template>
<script>
import Toast from "mint-ui";
import BlankRack from "@/page/bookRack/blank";
import BookList from "@/page/bookRack/bookList";
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
    BookList
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
          if(bstatus.code == 0){
              if(data.totalCount > 0){ // 书架有图书
                  this.isShow = false;
                  this.bookItems = data.bookItems
              }else{
                  this.isShow = true
              }
              
          }else if(bstatus.code == 1001){
              console.log('登录超时')
              this.$router.push('/login/login')
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
            // 已登录
            // if (data.userStatus == 1) {
            //   // 会员状态
            //   this.isMember = true;
            //   this.isMemberCode = 1;
            // } else {
            //   // 非会员或者会员失效
            //   this.isMember = false;
            //   this.isMemberCode = 0;
            //   this.name = data.name;
            // }
          } else if (bstatus.code == 1001) {
            // 未登录或者登录过期
            // this.isMember = false;
            // this.isMemberCode = 2;
          }
        });
    },
    // 删除图书
    deleteItem({index,shelfId}){
      console.log( shelfId)
      this.bookItems.splice(index, 1);
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

