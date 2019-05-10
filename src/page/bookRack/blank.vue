<template>
  <div
    v-if="isShow"
    id="blank"
  >
    <span class="iconfont icon-tubiaozhizuomoban"></span>
    <p>书架空空如也,快去添加图书吧!</p>
    <button class="button button-big" @click="goHome">去添加图书</button>
  </div>
</template>
<script>
export default {
  name: "Blank-rack",
  data() {
    return {};
  },
  props: ["isShow"],
  methods: {
      goHome(){
          this.$router.push({name: 'home'})
      }
  }
};
</script>
<style lang="less" scoped>
#blank {
  span {
    display: block;
    text-align: center;
    font-size: 1.8rem;
    color: #ccc;
    margin: 1.49rem 0 0.55rem;
  }
  p {
    font-size: 0.14rem;
    color: #666666;
    text-align: center;
    margin-bottom: 0.89rem;
  }
}
</style>


