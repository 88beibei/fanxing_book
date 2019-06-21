<template>
  <div
    id="blank"
  >
    <span class="iconfont icon-zanwudingdan"></span>
    <p>书架空空如也,快去添加图书吧!</p>
    <div class="btn">
      <button class="button button-big" @click="goHome">去添加图书</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Blank-rack",
  data() {
    return {};
  },
  // props: ["isShow"],
  methods: {
      goHome(){
          this.$router.push({name: 'home'})
      }
  }
};
</script>
<style lang="less" scoped>
#blank {
  width: 100%;
  height: 100%;
  background: #fff;
  // padding-bottom: 1.2rem;
  span {
    display: block;
    text-align: center;
    font-size: 1.4rem;
    color: #F7F7F7;
    padding: 1.2rem 0 0.4rem;
  }
  p {
    font-size: 0.14rem;
    color: #666666;
    text-align: center;
    margin-bottom: 0.89rem;
  }
  .btn{
    padding-bottom: 0.52rem;
  }
}
</style>


