var nav = require("../../template/nav.js");
Page({
  data:{
    isPop:false,
    isLuck:true
  },
  onBtnRule: nav.onBtnRule,
  // 兑换包
  onReddem(e){
    console.log(e.target.id)
  },
  // 启动抽奖
  onBtnLuck(e) {
    var _this = this;
    var api = getApp().api
    api.requestPlay(function(data){
      _this.setData({
        isPop :true,
        isLuck: data.luck
      })
    })
  },
  onLoad(){

  },
  //弹窗
  onClose(){
    this.setData({
      isPop: false
    })
  }
})