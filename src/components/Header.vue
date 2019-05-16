<template>
    <div class="header">
        <router-link to="/home">
            <!-- <span class="iconfont">&#xe606;</span><span class='title'>梵星网</span> -->
            <img :src="imgSrc" alt="">
        </router-link>
    </div>
</template>

<script>
import imgSrc from "@/images/logowhite.png";

export default {
  data() {
    return {
      imgSrc
    };
  },
  mounted() {

  },
  computed: {},
  watch: {},
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
.header{
    width: 100%;
    background: #239DF2; 
    color: #fff;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    a{
        font-size: 0;
        line-height: 0.44rem;
        height: 0.44rem;
    }
    img{
        width: 1rem;
        height: 0.32rem;
    }
    // span{
    //     font-size: 0.14rem;
    // }
    // .title{
    //     margin-left:0.1rem;
    // }
}
</style>
