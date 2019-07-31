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
          </div>
          <p class="book-name txt">{{item.bookName}}</p>
          <p class="book-author txt">{{item.author}}</p>
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
    // var ua = navigator.userAgent.toLowerCase();
    // var isWeixin = ua.indexOf('micromessenger') != -1;
    // let tip = sessionStorage.getItem("user_tip");
    // if(!tip){
    //   if (isWeixin) {
    //       this.$router.push({ path: '/tipMessage' })
    //   } 
    // }

    this.getRecommend();

    //获取地址栏channelCode参数
    // let channelCode = location.search.split("=")[1];
    let {channelCode} = this.$route.query
    if(channelCode){
      localStorage.setItem('channelCode', channelCode);
    }
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
      this.$router.push({ path: "/bookDetail", query: { bookId } });
    },

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
    // padding: 0 0.18rem;
    padding: 0 5%;
    box-sizing: border-box;
    .flex {
      flex-wrap: wrap;
      overflow: hidden;
      // justify-content: space-between;
      li {
        width: 30%;
        margin-right: 5%;
        // width: 1rem;
        // margin-right: 0.18rem;
        margin-bottom: 0.2rem;
        &:nth-child(3n){
          margin-right: 0;
        }
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
        .txt{
          overflow:hidden;
          text-overflow:ellipsis; 
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
