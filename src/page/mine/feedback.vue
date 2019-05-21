<template>
  <div id="feedback">
    <Header2 title="问题反馈"></Header2>
    <div class="wrap">
      <div class="qusType">
        <p>问题类型</p>
        <div class="qusMsg">
          <div
            :class="{'clear':true, 'tip':true, 'border': isShow}"
            @click="showTip"
          >
            <span class="fl">{{typeName}}</span>
            <span class="iconfont icon-jiantou fr icn"></span>
          </div>
          <ul v-show="isShow">
            <li
              v-for="(item,index) in list"
              :key="index"
              @click="getTypeCode(item.typeCode,item.typeName)"
            >
              {{item.typeName}}
            </li>
          </ul>
        </div>
      </div>
      <div class="desMsg">
        <p>问题描述</p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="desMsg"
          placeholder="请输入少于100字"
          maxlength="100"
        ></textarea>
      </div>
    </div>
    <button
      :class="{'button':true, 'button-big': true, 'btn':true,'isDisabled': isDisabled}"
      @click="feedback"
    >提交</button>
  </div>
</template>

<script>
import { Picker, Toast } from "mint-ui";
import Header2 from "@/components/header2";
export default {
  components: {
    Header2
  },
  data() {
    return {
      isShow: false,
      list: [],
      typeName: "阅读相关",
      questionType: 1,
      desMsg: "",
      isDisabled: false,
    };
  },
  mounted() {
    this.getQuestionType();
  },
  methods: {
    showTip() {
      this.isShow = !this.isShow;
    },
    getTypeCode(typeCode,typeName) {
      this.questionType = typeCode;
      this.isShow = false;
      this.typeName = typeName
    },
    getQuestionType() {
      this.$http
        .post("/fanxing-api/v1/user/question/type", {})
        .then(({ bstatus, data }) => {
          this.list = data;
        });
    },
    feedback() {
      if (this.desMsg.length <= 0) {
        Toast("请输入您的问题描述");
        return;
      }
      this.isDisabled = true;
        setTimeout(()=>{
            this.isDisabled = false;
        },30000)
      this.$http
        .post("/fanxing-api/v1/user/question/feedback", {
          questionType: this.questionType,
          content: this.desMsg
        })
        .then(({ bstatus, data }) => {
          this.$router.push("/feedbackSuccess");
        });
    }
  }
};
</script>

<style lang="less" scoped>
#feedback {
  width: 100%;
  height: 100%;
  background: #fff;
  .wrap {
    padding: 0 0.33rem;
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      color: #333333;
      font-weight: bold;
      margin-bottom: 0.16rem;
    }
    .qusType {
      padding-top: 0.76rem;
      .qusMsg {
        color: #000;
        font-size: 0.14rem;
        position: relative;
        .tip {
          padding: 0 0.12rem;
          margin-bottom: 0.37rem;
          width: 3.1rem;
          height: 0.42rem;
          line-height: 0.42rem;
          border: 1px solid #cacaca;
          border-radius: 2px;
          box-sizing: border-box;
          &.border{
            border-bottom-right-radius:0;
            border-bottom-left-radius:0;
          }
        }
        ul {
          position: absolute;
          left: 0;
          top: 0.42rem;
          width: 3.1rem;
          border: 1px solid #cacaca;
          background: #fff;
          box-sizing: border-box;
          li {
            padding: 0 0.12rem;
            line-height: 0.42rem ;
          }
        }
      }
    }
    .desMsg {
      textarea {
        width: 3.1rem;
        height: 1.5rem;
        border: 1px solid #cacaca;
        border-radius: 2px;
        resize: none;
        font-size: 0.14rem;
        padding: 0.13rem 0.15rem;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
      }
    }
  }
  .btn {
    margin-top: 0.95rem;
    &.isDisabled{
      pointer-events: none;
      background: #999;
    }
  }
}
</style>


