var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
const app = getApp();

Page({
  data:{
    head:"",
    nick:"",
    redeem:[], //已兑换棒签
    score: 200, //积分
    redcount:0,
    imagesUrl: app.globalData.imagesUrl,
    popup: false,
    redType: 1,
  },
  onBtnRule: nav.onBtnRule,
  onBtnHome: nav.onBtnHome,
  onGuide: popup.onGuide,
  onClose: popup.onClose,
  upfile: popup.upfile,
  formSubmit: popup.formSubmit,
  onLoad(e){
    var _this = this;
    app.api.getUserInfo(function(data){
      console.log(data)

      data.data.forEach((d,i)=>{
        console.log(d.award_name)
        // if(d.award_name.indexOf("oppo")!= -1 || )
      })
      _this.setData({
        score: data.score,
        redeem:data.data,
        head:data.head,
        nick:data.nick,
        redcount:data.redcount
      })
    })
  },
  saveuser(e){
    console.log(e)
    wx.showModal({
      title: '完善个人信息',
      showCancel: false
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'qiaolezi',
      path: `/pages/index/index`,
      imageUrl: ""
    }
  }
})