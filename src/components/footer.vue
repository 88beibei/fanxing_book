<template>
    <ul id="footer" class="flex">
        <router-link tag="li" v-for="(item, i) in linkList" :key="i" :to="item.link" active-class="active" @click.native="active(i)">
            <img :src="index == i ? item.active : item.icon" />
            <span>{{item.name}}</span>
        </router-link>
    </ul>
</template>
<script>
export default {
    name: 'Footer',
    data () {
        return {
            linkList: [{
                link: '/home/index',
                name: '首页',
                // icon: 'new_img',
                // active: 'new_active'
            },{
                link: '/home/my',
                name: '书架',
                // icon: 'my_img',
                // active: 'my_active'
            },{
                link: '/home/my',
                name: '我的',
                // icon: 'my_img',
                // active: 'my_active'
            }],
            index: 0,
        }
    },
    methods: {
        active(i){
            this.index = i;
        }
    }

}
</script>
<style lang="less" scoped>
#footer{
    box-shadow: 1px 0 4px 1px;
    height: @footerHeight;
    width: 100%;
    background-color: @bgColor2;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    li{
        text-align: center;
        flex: 1;
        color: #A2A2A2;
        img{/*图标*/
            display: block;
            width: 0.24rem;
            height: 0.24rem;
            margin: 0.05rem auto;
            margin-bottom: 0.01rem;
        }
        span{
            line-height: @normalFontsize;
            font-size: @smalllFontsize;
        }
        &.active{
            span{
                color: @fsColor3;
            }
        }
    }
}
</style>
