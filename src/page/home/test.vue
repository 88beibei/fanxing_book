<template>
  <div>
    <select name="" id="fruit" v-model="data">
      <option value="1">默认</option>
      <option value="2">樱桃</option>
      <option value="3">西瓜</option>
      <option value="4">火龙果</option>
    </select>

    {{data}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '2',
  
      clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
      candelete: {} // 滑动的item
    };
  },
  
};
</script>
<style lang="less" scoped>
#fruit{
  width: 2rem;
  height: 0.44rem;
}
</style>




