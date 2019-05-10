<template>
  <div>
    <div>目录</div>
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
  name: "Catalog",
  data() {
    return {
      content: [],
      bookId: ''
    };
  },
  mounted() {
    let {bookId} = this.$route.query
    this.bookId = bookId;
    this.getCatalog();
  },
  methods: {
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
      this.$router.push({ name: "chapter", query: { bookId, chapter } });
    }
  }
};
</script>

