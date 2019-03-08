var nav = require("../../template/nav.js");
const app = getApp();
Page({
  data:{
    isPop:false,
    isLuck:true,
    luck:"",
    userInfo:""
  },
  onBtnRule: nav.onBtnRule,
  // 兑换包
  onReddem(e){
    console.log(e.target.id)
    var _this =this;
    var type = e.target.id
    app.api.exscore(function(data){
      console.log(data)
    }, _this.data.userInfo.score, type)
  },
  // 启动抽奖
  onBtnLuck(e) {
    var _this = this;
    app.api.lottery(function(data){
      console.log(data)
      if(data.code == 0){
        _this.setData({
          isPop :true,
          isLuck: true,
          luck:data
        })
      }
    }, _this.data.userInfo.score)
  },
  onLoad(){
    this.onUserInfo();
  },
  onUserInfo(){
    var _this =this
    app.api.getUserInfo(function(data){
      console.log(data)
      _this.setData({
        userInfo:data
      })
    })
  },
  //弹窗
  onClose(){
    this.setData({
      isPop: false
    })
  }
})