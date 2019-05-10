<template>
  <div id="home-index">
    <div class="book">
      <ul class="flex">
        <li
          v-for="(item,index) in recommend"
          :key="index"
          @click="goDetail(item.bookId)"
        >
          <div><img
              :src="item.bookFrontUrl"
              alt=""
              class="bookImg"
            ></div>
          <p>{{item.bookName}}</p>
          <p>{{item.author}}</p>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import LeftSlider from "@/components/LeftSlider";
import Footer from "@/components/footer"
export default {
  name: "Home-index",
  components: {
    Footer
  },
  data() {
    return {
      recommend: []
    };
  },
  mounted() {
    this.getRecommend();
  },
  computed: {},
  watch: {},
  methods: {
    getRecommend() {
      this.$http
        .post("/fanxing-api/v1/index/recommend", {})
        .then(({ bstatus, data }) => {
          // console.log(data);
          if (bstatus.code == 0) {
            this.recommend = data.list;
          }
        });
    },
    goDetail(bookId){
      console.log(bookId)
       this.$router.push({path: '/bookDetail',query:{bookId}})
    }
  }
};
</script>

<style lang="less" scoped>
#home-index {
  width: 100%;
  height: 100%;
  .book {
    .flex {
      flex-wrap: wrap;
      li {
        width: 33%;
      }
      .bookImg {
        width: 90%;
        height: 1rem;
      }
    }
  }
}
</style>
