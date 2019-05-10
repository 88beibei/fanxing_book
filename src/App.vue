<template>
    <div id="app">
        <keep-alive include='Home'><router-view/></keep-alive>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',
  data(){
    return {

    }
  },
  mounted(){

  },
  computed: {
     
  },
  methods: {
      
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  // overflow: hidden; 
}
</style>
