<template>
  <div class='cate'>
    <div class='cate-content clear'>
      <span class='f-l l-content'>目录</span>
      <span class='iconfont f-r' @click="hideCata">&#xe60f;</span>
    </div>
    <ul>
      <li
        v-for="(item,index) in content"
        :key="index"
        @click="goDetail(item.bookId,item.chapter)"
      >
        {{item.indexName}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  // name: "Catalog",
  data() {
    return {
      content: [],
      bookId: '',
    };
  },
  mounted() {
    let {bookId} = this.$route.query
    this.bookId = bookId;
    this.getCatalog();
    // this.cataHeight = (document.documentElement.clientHeight - 32)/100 + 'rem';
    //  console.log((document.documentElement.clientHeight - 32)/100)
  },
  methods: {
    hideCata(){
        this.$emit("hideCata")
    },
    getCatalog() {
      let { bookId } = this;
      this.$http
        .post("/fanxing-api/v1/book/index", {
          bookId: bookId
        })
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            this.content = data.index;
          }
        });
    },
    goDetail(bookId, chapter) {
      console.log(bookId, chapter);
      this.$emit("goDetail",{bookId,chapter})
      // this.$router.push({ name: "chapter", query: { bookId, chapter } });
    }
  }
};
</script>
<style lang="less" scoped>
.cate{
  position: fixed;
  left: 0;
  top: 0.32rem;
  width: 100%;
  bottom: 0;
  // overflow: hidden;
  overflow-y: scroll;
  background-color: #fff;
  z-index: 99;
  .cate-content{
    height: 0.38rem;
    line-height: 0.38rem;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    .f-r{
      // margin-right: 0.14rem;
      font-size: 0.2rem;
      padding: 0 0.2rem;
    }
    .l-content{
      margin-left: 0.16rem;
    }
  }
  ul{
    li{
      height: 0.38rem;
      line-height: 0.38rem;
      border-bottom: 1px dashed #ccc; 
      padding-left: 0.2rem;
    }
  }
}
</style>


