<template>
  <div id='wrap-content'>
    <div
      class='set-bar'
      v-show='showbar'
    >
      <span
        :class="{'f-l':true, 'iconfont': true, 'l-icon': true, 'isChecked':isChecked}"
        @click='showCate'
      >&#xe60e;</span>
      <span
        :class="{'f-r':true, 'iconfont':true, 'r-icon':true, 'isSetChecked':isSetChecked}"
        @click='showbgc'
      >&#xe717;</span>
      <Catalog
        v-show='showCateContent'
        @hideCata="hideCata"
        @goDetail="goDetail"
      ></Catalog>
      <ul
        class="setBgcolor flex"
        v-show='showSetContent'
      >
        <li
          class="flex"
          @click="setBgcolor(index)"
          v-for="(item,index) in bgList"
          :key="index"
        >
          <span class="bgColor"></span>
          <span class="txt">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <!-- <div
    id='mine-index'
    v-html='content'
    @touchstart.capture="touchStart"
    @touchend.capture="touchEnd"
    @click="showSet"
    :style="{'backgroundColor': bgColor}"
  >

  </div> -->
    <div
      class="chapter"
      v-for="(item, index) in list"
      :key="index"
      :style="{ 'z-index': item.zIndex }"
    >
      <Chapter
        :type="type"
        :chapterIndex="index"
        :chapter="chapter"
        :totalCount="totalCount"
        v-if="item.show"
        :content="item"
        :bgColor="bgColor"
        @changePage="changePage"
        @pageNext="pageNext"
        @pagePrev="pagePrev"
        @showSet="showSet"
      >
      </Chapter>
    </div>
  </div>

</template>

<script>
import { Toast } from "mint-ui";
import Header2 from "@/components/header2";
import Catalog from "@/components/catalog";
import Chapter from "@/components/chapterTwo";
export default {
  data() {
    return {
      content: "",
      chapter: 1,
      bookId: "",
      totalCount: 0,
      showbar: false,
      showCateContent: false,
      isChecked: false,
      isSetChecked: false,
      showSetContent: false,
      bgColor: "",
      bgList: [
        {
          title: "默认",
          bgColor: "#F6F6F8"
        },
        {
          title: "羊皮纸",
          bgColor: "#E7DFD3"
        },
        {
          title: "护眼绿",
          bgColor: "#CDE5D5"
        },
        {
          title: "夜间",
          bgColor: "#333333"
        }
      ],
      type: 2,
      currentChapter: null,
      first: {
        content: '',
        page: 1,
        prev: null,
        next: null,
        show: true,
        zIndex: 2,
      },
      list: []
    };
  },
  computed: {
  },
  components: {
    Header2,
    Catalog,
    Chapter
  },
  mounted() {
    let { bookId } = this.$route.query;
    this.bookId = bookId;
    this.computedList();
		// setTimeout(_ => {
		// 	this.currentChapter.content = txt;
		// }, 2000);
    this.getDetails(1,content=>{
      	this.currentChapter.content = content;
    });

    let user_bgColor = localStorage.getItem("user_bgColor");
    this.bgColor = user_bgColor ? user_bgColor : "#F6F6F8";
  },
  methods: {
    computedList() {
			let list = [this.first];
			for (let item = this.first; item.next; item = item.next) {
				list.push(item.next);
			}
			this.list = list;
			this.currentChapter = list.find(v => v.show);
			// return list;
		},
    changePage(index, page, pages) {//改变页面
			let current = this.list[index];
			current.page = page;
			current.pages = pages;
			if (page == 0) {//上一章最后一页
				current.isPaged = true;
				current.page = pages;
      } else if (page == Math.floor(pages / 2) && !current.next && (this.chapter != this.totalCount)) {//中间 做预处理 下一章
				this.request(this.chapter + 1).then(txt => {
					current.next = {
						content: txt,
						page: 1,
						prev: current,
						next: null,
						show: false,
						zIndex: 1
					}
					this.computedList();
				});
			} else if (page == 1 && (this.chapter != 1) && !current.prev && !current.loading) {//第一页 做预处理  上一章
				current.loading = true; //请求中
				console.log('请求章节', current)
				this.request(this.chapter-1).then(res => {
					current.prev = {
						content: res,
						page: 0,
						prev: null,
						next: current,
						show: false,
						zIndex: 1
					}
					this.first = current.prev;
					this.computedList();
				});
			}
		},
   pageNext(index) {//下一章
   if(this.chapter == this.totalCount && this.currentChapter.page == this.currentChapter.pages){
      Toast("已至最后一章")
   }else{
     this.chapter += 1;
     let currentChapter = this.currentChapter;
     if (!currentChapter.next) return console.log('请求中');
     currentChapter.turnIndex = currentChapter.pages;
     currentChapter.zIndex = 2;
     currentChapter.next.show = true;
     this.currentChapter = currentChapter.next;
     setTimeout(_ => {
       currentChapter.show = false;
       currentChapter.zIndex = 1;
       currentChapter.page = currentChapter.pages;
       currentChapter.turnIndex = 0;
       currentChapter.next.zIndex = 2;
     }, this.type == 2 ? 300 : 0);
   }
				
		},
    pagePrev(index) {//上一章
     if(this.chapter == 1 && this.currentChapter.page == 1) {
       Toast("已至第一章")
     }else{
       this.chapter -= 1;
       let currentChapter = this.currentChapter;
       if (!currentChapter.prev) return console.log('请求中');
       currentChapter.turnIndex = 1;
       currentChapter.zIndex = 2;
       currentChapter.prev.show = true;
       this.currentChapter = currentChapter.prev;
       setTimeout(_ => {
         currentChapter.show = false;
         currentChapter.page = 1;
         currentChapter.zIndex = 1;
         currentChapter.turnIndex = 0;
         currentChapter.prev.zIndex = 2;
       }, this.type == 2 ? 300 : 0);
     }

		},
    request(chapter) {
      return new Promise((resolve, reject) => {
        this.getDetails(chapter,resolve);
      });
    },
    setBgcolor(index) {
      this.bgColor = this.bgList[index]["bgColor"];
      this.showbar = false;
      localStorage.setItem("user_bgColor", this.bgColor);
    },
    hideCata() {
      this.showCateContent = false;
      this.isChecked = false;
    },
    goDetail({ bookId, chapter }) {
      this.bookId = bookId;
      this.chapter = chapter;
      this.getDetails(chapter,content=> {
        this.first = {
          content: content,
          page: 1,
          prev: null,
          next: null,
          show: true,
          zIndex: 2,
        };
        this.computedList();
      });
      this.showSet();
    },
    getDetails(chapter,callback) {
      let { bookId } = this;
      this.$http
        .post("/fanxing-api/v1/book/view", {
          bookId: bookId,
          chapter,
        },false)
        .then(({ bstatus, data }) => {
          if (bstatus.code == 0) {
            var reg = /<body[^>]*>([\s\S]*)<\/body>/;
            var arr = reg.exec(data.content);
            if (typeof callback == "function") {
              callback(arr[1]);
            } else {
              this.first.content = arr[1];
            }
            this.totalCount = data.totalCount;
          }
        });
    },
    showSet() {
      this.showbar = !this.showbar;
    },
    //点击目录图标显示目录
    showCate() {
      this.showCateContent = !this.showCateContent;
      this.isChecked = this.showCateContent;
      if (this.showCateContent && this.showSetContent) {
        this.showSetContent = false;
        this.isSetChecked = false;
      }
    },
    showbgc() {
      this.showSetContent = !this.showSetContent;
      this.isSetChecked = this.showSetContent;
      if (this.showSetContent && this.showCateContent) {
        this.showCateContent = false;
        this.isChecked = false;
      }
    }
  }
};
</script>
<style lang="less">
#wrap-content {
  // padding-top: 0.44rem;
  height: 100%;
  overflow: hidden;
  font-size: 0.16rem;
  // background-color: #faf9de;
  position: relative;
  touch-action: none;
  .chapter {
    touch-action: none;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  .set-bar {
    width: 100%;
    height: 0.32rem;
    line-height: 0.32rem;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    // padding: 0 0.2rem;
    box-sizing: border-box;
    z-index: 99;
    .l-icon {
      margin-left: 0.2rem;
      font-size: 0.18rem;
      &.isChecked {
        color: #239df2;
      }
    }
    .r-icon {
      margin-right: 0.2rem;
      color: #666666;
      font-size: 0.18rem;
      &.isSetChecked {
        color: #239df2;
      }
    }
  }
  .setBgcolor {
    justify-content: space-between;
    position: fixed;
    width: 100%;
    padding: 0.1rem 0.34rem 0.06rem;
    left: 0;
    top: 0.32rem;
    box-sizing: border-box;
    background: #fff;
    border-top: 1px solid #979797;
    border-bottom: 1px solid #979797;

    li {
      flex-direction: column;
      width: 0.4rem;
      text-align: center;
      .bgColor {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        //  margin-bottom: 0.04rem;
        border: 1px solid #979797;
      }
      &:first-child {
        .bgColor {
          background: #fff;
        }
      }
      &:nth-child(2) {
        .bgColor {
          background: #e7dfd3;
        }
      }
      &:nth-child(3) {
        .bgColor {
          background: #cde5d5;
        }
      }
      &:nth-child(4) {
        .bgColor {
          background: #333333;
        }
      }
      .txt {
        font-size: 0.12rem;
        color: #333333;
        height: 0.25rem;
        line-height: 0.25rem;
      }
    }
  }
}
#mine-index {
  // padding: 0.12rem 0.18rem;
  // background: pink;
  // word-wrap: break-word;
  // font-size: 0.16rem;
  // ul,
  // li {
  //   list-style-type: none;
  //   margin: 0;
  //   padding: 0;
  // }

  // p {
  //   line-height: 1.5em;
  //   margin-top: 0;
  //   margin-bottom: 1.5em;
  // }

  // .catalog {
  //   line-height: 3.5em;
  //   height: 3.5em;
  //   font-size: 0.8em;
  // }
  // li {
  //   border-bottom: 1px solid #d5d5d5;
  // }
  // h1 {
  //   font-size: 1.6em;
  //   font-weight: bold;
  // }

  // h2 {
  //   display: block;
  //   font-size: 1.2em;
  //   font-weight: bold;
  //   margin-bottom: 0.83em;
  //   margin-left: 0;
  //   margin-right: 0;
  //   margin-top: 1em;
  // }

  // .mbppagebreak {
  //   display: block;
  //   margin-bottom: 0;
  //   margin-left: 0;
  //   margin-right: 0;
  //   margin-top: 0;
  // }
  // a {
  //   color: inherit;
  //   text-decoration: none;
  //   cursor: default;
  // }
  // a[href] {
  //   color: blue;
  //   text-decoration: none;
  //   cursor: pointer;
  // }

  // .italic {
  //   font-style: italic;
  // }
}
</style>


