<template>
  <div id="home-index">
    <Header></Header>
    <div class="recomment">
      <h4 class="f-l">精品推荐</h4>
      <router-link class="f-r" to='/recomment'>更多 &gt;</router-link>
    </div>
    <div class="book">
      <ul class="flex">
        <li v-for="(item,index) in recommend" :key="index" @click="goDetail(item.bookId)">
          <div class="book-cover" :style="{'background-image':'url('+item.bookFrontUrl+')'}">
            <!-- <img :src="item.bookFrontUrl" alt class="bookImg"> -->
          </div>
          <p class="book-name">{{item.bookName}}</p>
          <p class="book-author">{{item.author}}</p>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import LeftSlider from "@/components/LeftSlider";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  name: "Home-index",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      recommend: []
    };
  },
  mounted() {
    // 微信环境判断
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        this.$router.push({ path: '/tipMessage' })
        // return true;
    } else {
        // return false;
    }
    this.getRecommend();
  },
  computed: {},
  watch: {},
  methods: {
    getRecommend() {
      this.$http
        .post("/fanxing-api/v1/index/recommend", {})
        .then(({ bstatus, data }) => {
          this.recommend = data.list;
        });
    },
    goDetail(bookId) {
      console.log(bookId);
      this.$router.push({ path: "/bookDetail", query: { bookId } });
    }
  }
};
</script>

<style lang="less" scoped>
#home-index {
  width: 100%;
  background: #fff;
  padding-bottom: 0.49rem;
  padding-top:0.44rem;
  .recomment {
    height: 0.5rem;
    line-height: 0.5rem;
    box-sizing: border-box;
    padding: 0 0.2rem 0 0.2rem;
    h4 {
      font-size: 0.18rem;
      font-weight: 500;
    }
    a {
      color: #239df2;
      font-size: 0.12rem;
    }
  }
  .book {
    padding: 0 0.18rem;
    box-sizing: border-box;
    .flex {
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 30%;
        margin-bottom: 0.2rem;
        .book-cover {
          width: 100%;
          height: 1.2rem;
          box-sizing: border-box;
          margin-bottom: 0.06rem;
          background: center center no-repeat #fff;
          box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.5);
          background-size: auto 80%;
          border-radius: 4px;
        }
        .book-name {
          font-size: 0.14rem;
          color: #333333;
          margin-bottom: 0.05rem;
        }
        .book-author {
          font-size: 0.12rem;
          color: #999999;
        }
      }
      .bookImg {
        width: 100%;
        height: 1.2rem;
      }
    }
  }
}
</style>
