var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
const app = getApp();

Page({
  data:{
    head:"",
    nick:"",
    redeem: [], //已兑换棒签
    idCard: ["", ""],
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
  formSubmitEntity: popup.formSubmitEntity,
  onLoad(e){
    var _this = this;
    app.api.getUserInfo(function(data){
      console.log(data)

      // data.data.forEach((d,i)=>{
      //   console.log(d.award_name)
      //   // if(d.award_name.indexOf("oppo")!= -1 || )
      // })
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
    var _this = this;
    var code = e.currentTarget.dataset.code
    var id = e.currentTarget.dataset.id
    console.log(e, code,id)
    _this.data.award_id = id
    switch (code) {
      case "20002":
        //52红包
        _this.setData({ popup: 'info', redType: 2})
        break;
      case "20003":
        //520红包
        _this.setData({ popup: 'info', redType: 3})
        break;
      case "2204":
        //oppo
        _this.setData({ popup: 'oppo', redType: 1})
        break;
      case "3204":
        //baby
        _this.setData({ popup: 'entity', redType: 2})
        break;
      case "3205":
        //王子异
        _this.setData({ popup: 'entity', redType: 3})
        break;
    }
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})