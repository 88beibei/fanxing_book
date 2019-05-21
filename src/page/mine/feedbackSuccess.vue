<template>
  <div id="feedbackSuc">
    <Header2 title="问题反馈"></Header2>
    <div class="tip">
      <span class="iconfont icon-chenggong"></span>
      <p class="txt">您反馈的问题已经提交成功，我们将会尽快为您处理，感谢您的反馈。</p>
    </div>
    <div class="clear go">
      <button class="fl btn1" @click="goHome">返回首页</button>
      <button class="fr btn2" @click="sure">确定</button>
    </div>
  </div>
</template>
<script>
import Header2 from "@/components/header2";
export default {
  components: {
    Header2
  },
  data() {
    return {};
  },
  methods: {
    goHome(){
      this.$router.push('/home')
    },
    sure(){
      this.$router.push('/mine')
    }
  }
};
</script>

<style lang="less" scoped>
#feedbackSuc {
  width: 100%;
  height: 100%;
  background: #fff;
  .go {
    padding: 0 0.2rem;
    button{
      width: 1.6rem;
      line-height: 0.4rem;
      box-shadow: 0 2px 4px 1px rgba(197, 197, 197, 0.5);
      border-radius: 2px;
      font-family: PingFangSC-Medium;
      font-size: 0.14rem;
    }
    .btn1 {
      background: #ffffff;
      color: #666666;
    }
    .btn2{
      background: #239DF2;
      color: #FFFFFF;
    }
  }
  .tip {
    padding: 1.65rem 0.55rem 0;
    text-align: center;
    span {
      font-size: 0.59rem;
      color: #239df2;
      margin: auto;
    }
    .txt {
      text-align: left;
      font-size: 0.14rem;
      color: #999999;
      height: 0.4rem;
      line-height: 0.2rem;
      margin: 0.38rem 0 1.75rem;
    }
  }
}
</style>


