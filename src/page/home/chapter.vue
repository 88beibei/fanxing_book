<template>
  <div
    id='mine-index'
    v-html='content'
    @touchstart.capture="touchStart"
    @touchend.capture="touchEnd"
  >

  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      chapter: 1,
      bookId: 1,
      startX: 0,
      endX: 0
    };
  },
  mounted() {
    console.log(this.$route.query)
    let {bookId,chapter} = this.$route.query
    console.log(typeof Number(chapter))
    this.bookId = bookId;
    this.chapter = chapter;
    this.getDetails();
  },
  methods: {
    getDetails() {
      let { bookId, chapter } = this;
      this.$http
        .post("/fanxing-api/v1/book/view", {
          bookId: bookId,
          chapter: chapter
        })
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            var reg = /<body[^>]*>([\s\S]*)<\/body>/;
            var arr = reg.exec(data.content);
            this.content = arr[1];
          } else if (bstatus.code == 1003) {
            console.log("已经滑到最后了");
          }
        });
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      let slideDis = this.startX - this.endX;
      if (slideDis > 30) {
        //   console.log('左滑')
        this.chapter += 1;
        this.getDetails();
        document.documentElement.scrollTop = 0;
      }
      if (slideDis < -30) {
        //   console.log('右滑')
        if(this.chapter > 1){
           this.chapter -= 1;
            this.getDetails();
            document.documentElement.scrollTop = 0;
        }else{

            console.log('已经滑到最左边了')
        }
      }
    }
  }
};
</script>
<style lang="less">
#mine-index {
  padding: 0.12rem 0.1rem;
  background: pink;
  word-wrap: break-word;
  font-size: 0.14rem;
  ul,
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  p {
    line-height: 1.5em;
    margin-top: 0;
    margin-bottom: 1.5em;
  }

  .catalog {
    line-height: 3.5em;
    height: 3.5em;
    font-size: 0.8em;
  }
  li {
    border-bottom: 1px solid #d5d5d5;
  }
  h1 {
    font-size: 1.6em;
    font-weight: bold;
  }

  h2 {
    display: block;
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0.83em;
    margin-left: 0;
    margin-right: 0;
    margin-top: 1em;
  }

  .mbppagebreak {
    display: block;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
    cursor: default;
  }
  a[href] {
    color: blue;
    text-decoration: none;
    cursor: pointer;
  }

  .italic {
    font-style: italic;
  }
}
</style>


