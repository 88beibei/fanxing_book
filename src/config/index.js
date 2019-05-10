

'use strict';
import { icon_img, icon_video } from "./images.js";
export default { //上传 发送等相关配置
    upload: [{
            name: 'image',
            number: 9,
            src: icon_img,
            accept: 'image/*',
            icon: 'jia',
        }, {
            name: 'video',
            number: 1,
            src: icon_video,
            accept: 'video/*',
            icon: 'shipin',
            capture: 'camcorder'
        }
    ],
    md5: { //加密配置
        text: 1000, //最大文字数
    },
    pay: [{
        name: '微信支付',
        value: '13',
        icon: 'weixinzhifu'
    },
    // {
    //     name: '支付宝支付',
    //     use: navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1,
    //     value: '12',
    //     icon: 'zhifubaozhifu'
    // }
    ]
}

//配置相关
var tokenUrl = '/store/gen.do'; //获取token



// 首页接口
var uploadUrl = '/store/upload.do'; //图片上传
var heightUrl = '/currentHeight.do'; //区域高度
var amountUrl = '/lowestAmount.do'; //获取金额
var timeUrl = '/exceptTime.do';
var createOrderUrl = '/prepayIpayNow.do'; //下单
//登录相关
var sendSmsUrl = '/sendVerificationCode.do';
var loginByCodeUrl = '/loginByCode.do';
var loginByPwdUrl = '/loginByPassword.do';
var resetPwdUrl = '/resetPassword.do';
//列表
var myToUrl = '/sendToMeList.do';
var myFromUrl = '/sendHistory.do';
var myAllUrl = '/listMessage.do';
var getMediaUrl = '/store/list.do';
var decryptUrl = '/decrypt.do';
var getOrderUrl = '/getMsgById.do';
var getLinkUrl = '/getShareMsgById.do';

// 帮助页
var helpUrl = '/question.do';

export { tokenUrl, uploadUrl, heightUrl, amountUrl, sendSmsUrl, loginByCodeUrl, loginByPwdUrl, myToUrl, myFromUrl, resetPwdUrl, myAllUrl, createOrderUrl, timeUrl, getMediaUrl, decryptUrl, helpUrl, getOrderUrl, getLinkUrl }


// 正则
var telReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

export { telReg };


