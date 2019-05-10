<template>
  <div id="bookDetail">
    <Header2 title="图书详情"></Header2>
    <div class="clear book-content">
      <div class="fl book-img" :style="{'background-image':'url('+detail.bookFrontUrl+')'}"></div>
      <div class="fl">
        <h4>{{detail.bookName}}</h4>
        <p>作者：{{detail.author}}</p>
        <p>版权：{{detail.bookName}}</p>
      </div>
    </div>
    <div v-if="isMember==0" class='book-btn'>
      <button class="button button-normal fl" @click="addBookRack">添加至书架</button>
      <button class="button button-normal fr" @click="goCatalog(detail.bookId)">在线阅读</button>
    </div>
    <div v-else-if="isMember==1" class='book-btn'>
      <button class="button button-big" @click="getMembership">开通会员</button>
    </div>
    <div>
      <h5>图书简介</h5>
      <p>{{detail.introduction}}</p>
    </div>
    
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import Header2 from "@/components/header2";
import Footer from "@/components/footer";
export default {
  data() {
    return {
      bookId: "",
      detail: "",
      isMember: 2,
      isMemberCode: 2, // 默认未登录
      name: "" // 用户手机号
    };
  },
  components: {
    Header2,
    Footer
  },
  mounted() {
    let { bookId } = this.$route.query;
    this.bookId = bookId;
    console.log(this.$route.query);
    this.getDetail();
    this.getUserDetail();
  },
  methods: {
    getDetail() {
      let { bookId } = this;
      this.$http
        .post("/fanxing-api/v1/book/detail", { bookId })
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            this.detail = data;
            console.log();
          } else {
            // 待做处理
          }
        });
    },
    // 跳转到目录
    goCatalog(bookId) {
      console.log(bookId);
      this.$router.push({ name: "catalog", query: { bookId } });
    },
    // 获取用户信息
    getUserDetail() {
      this.$http
        .post("/fanxing-api/v1/user/detail", {})
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            // 已登录
            if (data.userStatus == 1) {
              // 会员状态
              this.isMember = 1;
              this.isMemberCode = 1;
            } else {
              // 非会员或者会员失效
              this.isMember = 0;
              this.isMemberCode = 0;
              this.name = data.name;
            }
          } else if (bstatus.code == 1001) {
            // 未登录或者登录过期
            this.isMember = 0;
            this.isMemberCode = 2;
          }
        });
    },
    // 开通会员
    getMembership() {
      let { isMemberCode, name } = this;
      if (isMemberCode == 0) {
        // 登录状态的非会员
        this.$router.push({
          name: "member",
          query: {
            name
          }
        });
      } else if (isMemberCode == 2) {
        this.$router.push("/login/login");
      }
    },
    // 添加书架
    addBookRack() {
      let { bookId } = this;
      this.$http
        .post("/fanxing-api/v1/bookshelf/add", {
          bookId
        })
        .then(({ bstatus }) => {
          if (bstatus.code == 0) {
            Toast({
              message: "添加至书架成功",
              position: "top",
              duration: 3000
            });
          } else {
            Toast({
              message: bstatus.msg,
              position: "top"
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#bookDetail {
  padding-top: 0.44rem;
  background: #F6F6F8;
  .book-content {
    padding: 0.16rem;
    .book-img {
      width: 1.09rem;
      height: 1.34rem;
      box-sizing: border-box;
      margin-bottom: 0.06rem;
      background: center center no-repeat #fff;
      background-size: auto 80%;
      border-radius: 4px;
    }
    .fl {
      padding: 0.26rem 0.2rem;
      h4 {
        font-size: 0.14rem;
        color: #333333;
        margin-bottom: 0.26rem;
      }
      p {
        font-size: 0.12rem;
        color: #999999;
        margin: 0.1rem 0;
      }
    }
  }
  .book-btn{
    margin-bottom: 0.2rem;
  }
}
</style>

