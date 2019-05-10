<template>
  <div id="bookDetail">
    <div class="clear">
      <div class="fl"><img
          class="img"
          :src="detail.bookFrontUrl"
          alt=""
        ></div>
      <div class="fl">
        <p>{{detail.author}}</p>
        <p>{{detail.bookName}}</p>
      </div>
    </div>
    <div v-if="isMember==1">
      <button
        class="button button-normal"
        @click="addBookRack"
      >添加至书架</button>
      <button class="button button-normal"  @click="goCatalog(detail.bookId)">在线阅读</button>
    </div>
    <div v-else-if="isMember==0">
      <button
        class="button button-big"
        @click="getMembership"
      >开通会员</button>
    </div>
    <p>图书简介</p>
    <p>{{detail.introduction}}</p>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
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
               position: "top",
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#bookDetail {
  .clear {
    .fl {
      .img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>

