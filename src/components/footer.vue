<template>
    <ul id="footer" class="flex">
        <router-link class="flex" tag="li" v-for="(item, i) in linkList" :key="i" :to="{path: item.link,query:{index:i}}" active-class="active">
            <i :class="['iconfont', (index == i) ? item.active : item.icon]"></i>
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
                icon: 'icon-zhuye',
                active: 'icon-homepage_selected',
            },{
                link: '/bookRack',
                name: '书架',
                icon: 'icon-shujia',
                active: 'icon-stake-copy-copy',
            },{
                link: '/mine',
                name: '我的',
                icon: 'icon-wode1',
                active: 'icon-zhanghu',
            }],
            index:  this.$route.query.index || 0,
        }
    },
    watch: {
    },
    mounted () {
        
    },
    methods: {
    }

}
</script>
<style lang="less" scoped>
#footer{
    box-shadow: 1px 0 4px 1px rgba(224,224,224,0.50);
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
        &.flex{
            flex-direction: column;
            align-items: center;
        }
        i{/*图标*/
            font-size: 0.18rem;
            color: #239DF2; 
            margin-top: 0.07rem;
            margin-bottom: 0.03rem;
        }
        span{
            font-size: 0.12rem;
            color: #333333;
        }
        &.active{
        }
    }
}
</style>
