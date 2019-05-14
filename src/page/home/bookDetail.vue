<template>
  <div id="bookDetail">
    <Header2 title="图书详情"></Header2>
    <div class="clear book-content">
      <div class="fl book-img" :style="{'background-image':'url('+detail.bookFrontUrl+')'}"></div>
      <div class="fl">
        <h4>{{detail.bookName}}</h4>
        <p>作者：{{detail.author}}</p>
      </div>
    </div>
    <div class="book-btns">
      <div v-if="isMember==1" class="book-btn">
        <div>
          <button :class="{'btn': true,'f-l': true, 'disabled': isDisabled}" @click="addBookRack" v-if="!shelfStatus">添加至书架</button>
          <button class="btn f-l" v-else>已添加书架</button>
        </div>
        <button class="btn btn-blue f-r" @click="goCatalog(detail.bookId)">在线阅读</button>
      </div>
      <div v-else-if="isMember==0" class="book-btn">
        <button class="button button-big" @click="getMembership">开通会员</button>
      </div>
    </div>

    <div class="detail-content">
      <h5>图书简介</h5>
      <div class="line"></div>
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
      shelfStatus: false,
      isDisabled: false,
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
        .post("/fanxing-api/v1/user/detail", {bookId: this.bookId}, false)
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
              this.shelfStatus =  data.shelfStatus
              console.log(this.shelfStatus)

          } 
          // else if (bstatus.code == 1001) {
          //   // 未登录或者登录过期
          //   this.isMember = 0;
          //   this.isMemberCode = 2;
          // }
        },()=>{
          if(bstatus.code == 1001){
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
      this.isDisabled = true;
        setTimeout(()=>{
            this.isDisabled = false;
        },10000)
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
            this.shelfStatus = true;
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
  background: #f6f6f8;
  // padding: 0.16rem;
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
  .book-btns {
    padding: 0 0.16rem;
    overflow: hidden;
    .book-btn {
      margin-bottom: 0.2rem;
      .btn {
        width: 48%;
        height: 0.4rem;
        border: 1px solid #DFDFE0;
        box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.5);
        border-radius: 2px;
        &.disabled{
          pointer-events: none;
          background: #999;
      }
      }
      .btn-blue {
        background-color: #239df2;
        color: #fff;
      }
    }
  }
  .detail-content {
    padding: 0.16rem;
    h5 {
      font-size: 0.16rem;
      color: #333333;
      text-align: center;
      font-weight: 600;
    }
    .line {
      width: 90%;
      height: 1px;
      background: #d8d8d8;
      margin: 0.3rem 0 0.2rem 0;
    }
    p {
      font-size: 14px;
      color: #666666;
      line-height: 0.24rem;
    }
  }
}
</style>

