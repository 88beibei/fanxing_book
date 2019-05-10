<template>
  <ul id="bookList">
    <li
      v-for="(item,index) in list"
      :key="index"
      :class="{move:candelete.index==index}"
    >
      <div
        class="clear"
        @touchstart.capture.stop="touchStart(item)"
        @touchend.capture.stop="touchEnd(index)"
      >
        <div class="imgBox fl"><img
            :src="item.coverImg"
            alt=""
          ></div>
        <div class="fl">
          <p>{{item.name}}</p>
          <p>{{item.author}}</p>
        </div>
      </div>
      <div
        class="del"
        @click.prevent="delItem(index,item.shelfId)"
      >删除</div>
      <button class="btn button button-small" v-if="memCode==1" @click="goCatalog(item.bookId)">阅读</button>
      <button class="btn button button-small" v-else-if="memCode==2" @click="goMember">续费</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["list", "memCode"],
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
    goCatalog(bookId){
        this.$router.push({name: 'catalog',query:{bookId}})
    },
    goMember(){
        this.$router.push({name: 'member'})
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
#bookList{
    li{
        .btn{
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
        }
    }
}
li {
  background: #fdfdfd;
  border-bottom: 1px solid #e1e1e1;
  line-height: 40px;
  position: relative;
  transform: translateX(0);
  transition: all 0.3s; /*滑动效果更生动*/
  padding-left: 10px;
  .imgBox {
    img {
      width: 1rem;
      height: 1rem;
    }
  }
}
ul {
  overflow-x: hidden; /*隐藏ul x轴的滚动条*/
}
li.move {
  transform: translateX(-60px); /*滑动后x轴位移-60px,使其可见*/
}
.del {
  position: absolute;
  top: 0;
  right: -1px;
  z-index: 3;
  width: 60px;
  height: 100%;
  text-align: center;
  color: #fff;
  background-color: #ff5b45;
  transform: translateX(60px); /*默认x轴位移60px，使其隐藏*/
}
</style>


