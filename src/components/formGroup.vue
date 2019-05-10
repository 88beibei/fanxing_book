<template>
    <div class="form-group flex">
        <div class="clear left">
            <p class="fl">
                <i :class="['iconfont', 'icon-' + icon]"></i>
                <span v-if="tip" class="tip">{{tip}}</span>
            </p>
            <p class="size">
                <input :type="type" v-model="val" :placeholder="placeholder" @input="input" :maxlength="maxlength" />
            </p>
            <i v-if="btnIcon" :class="['iconfont', 'icon-' + btnIcon]" @click="iconChange"></i>
        </div>
        <button v-if="btn" :class="['button', 'button-small', disabledCls]" @click="click" v-html="btn"></button>
    </div>
</template>

<script>
    export default {
        name: 'Form-group',
        data(){
            return {
                val: this.value
            }
        },
        props: ['value', 'icon', 'type', 'tip', 'placeholder', 'btn', 'maxlength', 'btnDisabled', 'btnIcon'],
        mounted(){

        },
        computed: {
            disabledCls(){
                var conf = ['disabled', '', 'timing'];
                return conf[this.btnDisabled];
            }
        },
        methods: {
            click(){
                if(this.btnDisabled != 1) return;
                this.$emit("click");
            },
            input(){
                if(this.placeholder.indexOf('手机号') != -1){ this.val = this.val.replace(/[^0-9]/ig, ""); }
                this.$emit('input', this.val);
            },
            iconChange(){
                this.$emit('iconChange', this.btnIcon);
            }
        }
    }
</script>

<style lang='less' scoped>
.form-group{
    font-size: 0;
    margin-bottom: 0.1rem;
    .left{
        padding: 0.1rem 0;
        flex: 1;
        line-height: 0.2rem;
        height: 0.2rem;
        border-bottom: 0.01rem solid @color3;
        position: relative;
        >i{
            position: absolute;
            right: 0;
            top: 50%;
            .move();
        }
    }
    i{
        font-size: @bigFontsize;
    }
    .tip{
        margin-left: 0.16rem;
        font-size: @mainFontsize;
        line-height: @mainFontsize;
        padding-right: 0.12rem;
        border-right: 0.01rem solid @fsColor1;
    }
    input{
        width: 100%;
        box-sizing: border-box;
        padding-left: 0.12rem;
        line-height: @bigFontsize;
        color: @fsColor;
        font-size: @anoFontsize;
    }
    button{
        width: 1.05rem;
        margin: 0.12rem 0 0 0.2rem;
    }
}
</style>