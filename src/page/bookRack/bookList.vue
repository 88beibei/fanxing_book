<template>
  <ul id="bookList">
    <li
      v-for="(item,index) in list"
      :key="index"
      :class="{move:candelete.index==index}"
       @click="goChapter(item.bookId)"
    >
      <div
        class="clear"
        @touchstart.capture.stop="touchStart(item)"
        @touchend.capture.stop="touchEnd(index)"
      >
        <div class="imgBox fl" :style="{'background-image':'url('+item.coverImg+')'}">
          <!-- <img
            :src="item.coverImg"
            alt=""
          > -->
          </div>
        <div class="fl msg">
          <p>{{item.name}}</p>
          <p>作者: {{item.author}}</p>
        </div>
      </div>
      <div
        class="del"
        @click.stop="delItem(index,item.shelfId)"
      >删除</div>
      <button
        class="btn"
        v-if="memCode==1"
      >阅读</button>
      <button
        class="btn button button-small"
        v-else-if="memCode==2"
        @click="goMember"
      >续费</button>
       <div class="line"></div>
    </li>
    <div v-show="loading" class="loading">
      加载中...
    </div>
  </ul>
</template>
<script>
export default {
  props: ["list", "memCode","loading"],
  data() {
    return {
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {} // 滑动的item
    };
  },
  methods: {
    /**
     * 删除item
     * index是下标
     */
    delItem(index, shelfId) {
      //   this.list.splice(index, 1);
      console.log(index);
      this.$emit("deleteItem", { index, shelfId });
      this.candelete = {};
      // splice方法是删除数组某条数据，或者向某个位置添加数据
    },
    goChapter(bookId) {
      // this.$router.push({ name: "catalog", query: { bookId } });
      this.$router.push({ name: "chapter", query: { bookId } });
    },
    goMember() {
      this.$router.push({ name: "member" });
    },
    touchStart(item) {
      let touchs = event.changedTouches[0];
      // 记录开始滑动的鼠标位置
      this.clientNum.x1 = touchs.pageX;
      this.candelete = {};
    },
    touchEnd(index) {
      let touchs = event.changedTouches[0];
      // 记录结束滑动的鼠标位置
      this.clientNum.x2 = touchs.pageX;
      this.candelete = {};
      // 判断滑动距离大于50，判定为滑动成功，否则失败
      if (
        this.clientNum.x2 < this.clientNum.x1 &&
        Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
      ) {
        // event.preventDefault();
        this.candelete.index = index;
      } else if (
        this.clientNum.x2 > this.clientNum.x1 &&
        Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
      ) {
        // event.preventDefault();
        this.candelete = {};
      }
    }
  }
};
</script>
<style lang="less" scoped>
#bookList {
  padding-top: 0.44rem;
  padding-bottom: 0.49rem;
  height: 100%;
  box-sizing: border-box;
  li {
    .btn {
      position: absolute;
      width: 0.5rem;
      height: 0.24rem;
      box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.5);
      border-radius: 2px;
      // background: pink;
      right: 0.2rem;
      top: 0.54rem;
    }
    .line{
      height: 1px;
      background: #ededed;
      margin-top: 0.19rem;
      margin-right: 0.2rem;
    }
  }
  .loading{
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    background: #fff;
  }
}
li {
  background: #fff;
  position: relative;
  transform: translateX(0);
  transition: all 0.3s; /*滑动效果更生动*/
  padding: 0.2rem 0 0 0.17rem;
  .imgBox {
    width: 0.7rem;
    height: 0.85rem;
    background: center center no-repeat #fff;
    background-size: auto 80%;
    box-shadow: 0 2px 4px 1px rgba(197,197,197,0.50);
  }
  .msg {
    p {
      height: 0.2rem;
      margin-left: 0.19rem;
    }
    p:first-child {
      font-family: PingFangSC-Medium;
      font-size: 0.14rem;
      color: #333333;
      margin-top: 0.12rem;
      margin-bottom: 0.09rem;
    }
    p:last-child {
      font-size: 0.1rem;
      color: #999999;
    }
  }
}
ul {
  overflow-x: hidden; /*隐藏ul x轴的滚动条*/
}
li.move {
  transform: translateX(-1rem); /*滑动后x轴位移-1rem,使其可见*/
}
.del {
  position: absolute;
  top: 0;
  right: -1px;
  z-index: 3;
  width: 1rem;
  height: 100%;
  line-height: 1.26rem;
  text-align: center;
  color: #fff;
  font-family: PingFangSC-Medium;
  font-size: 0.16rem;
  background-color: #ff5b45;
  transform: translateX(1rem); /*默认x轴位移1rem，使其隐藏*/
}
</style>


