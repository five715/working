var nav = require("../../template/nav.js");
const app = getApp();
Page({
  data:{
    isPop:false,
    isLuck:true,
    luck:"",
    userInfo:"",
    prizes: [
      { prize: "no", state: "yes" },
      { prize: "red", state: "no" },
      { prize: "vip", state: "no" },
      { prize: "red", state: "no" },
      { prize: "no", state: "no" },
      { prize: "vip", state: "no" },
      { prize: "no", state: "no" },
      { prize: "oppo", state: "no" }
    ]
  },
  onBtnRule: nav.onBtnRule,
  onBtnHome: nav.onBtnHome,
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
        _this.funcLuck(function(){
          _this.setData({
            isPop: true,
            isLuck: true,
            luck: data
          })
        },data.award_id)
      }
    }, _this.data.userInfo.score)
  },
  funcLuck(callback, id) {
    var _this = this
    var isIn = false,   //是开始减速
        speed = 30,     //起始速度
        rise = 50,      //速度增长单位
        i = 1,          //起始位置
        encircle = 5,   //最少圈数
        buffer = 7,     //缓冲数量
        prizes = _this.data.prizes
    
    function count() {
      ++i > prizes.length && (i = 1, encircle--)

      for (var p = 0; p < prizes.length; p++) {
        prizes[p].state = "no"
        prizes[i - 1].state = "yes"
      }
      _this.setData({
        prizes: prizes
      })

      if (encircle <= 0 && i == (id < buffer ? prizes.length + (id - buffer) : id - buffer)) isIn = true

      if (isIn) {
        speed += rise
        if (i == id && speed > rise * 3) {
          setTimeout(callback, 500)
          return false
        }
      }
      setTimeout(count, speed)
    }
    count()
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