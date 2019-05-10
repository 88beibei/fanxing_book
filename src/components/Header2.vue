<template>
    <div class="header">
        <router-link to=''  @click.native="goBack()"><span class="iconfont">&#xe610;</span></router-link><span class='title'>{{title}}</span>
    </div>
</template>

<script>

export default {
  data() {
    return {
      
    };
  },
  mounted() {

  },
  props:['title'],
  computed: {},
  watch: {},
  methods: {
    goBack(){
        this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.header{
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    background: #239DF2; 
    color: #fff;
    padding: 0 0.16rem;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    span{
        font-size: 0.14rem;
    }
    .title{
        margin-left:0.16rem;
        border-left:1px solid #5AB5F4;
        padding-left: 0.16rem;
        height: 70%;
        line-height: 0.308rem;
    }
}
</style>
