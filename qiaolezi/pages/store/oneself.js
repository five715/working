var nav = require("../../template/nav.js");
const app = getApp();

Page({
  data:{
    head:"",
    nick:"",
    redeem:[], //已兑换棒签
    score: 200 //积分
  },
  onBtnRule: nav.onBtnRule,
  onBtnHome: nav.onBtnHome,
  onLoad(e){
    var _this = this;
    app.api.getUserInfo(function(data){
      console.log(data)
      _this.setData({
        score: data.score,
        redeem:data.data,
        head:data.head,
        nick:data.nick
      })
    })
  }
})