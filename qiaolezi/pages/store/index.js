var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
const app = getApp();
Page({
  data:{
    isPop:false,
    isLuck:true,
    luck:"",
    userInfo:"",
    redeems: [
      { src: 1, score: 300, surplus: 80, type: 3, name: "爱奇艺季卡" },
      { src: 2, score: 100, surplus: 90, type: 2, name: "爱奇艺月卡" },
      { src: 3, score: 50, surplus: 90, type: 1, name: "爱奇艺7天卡" },
      // { src: 4, score: -1, surplus: 80 },
      // { src: 5, score: -1, surplus: 90 },
      { src: 6, score: 800, surplus: 80, type: 4, name: "baby签名照" },
      { src: 6, score: 800, surplus: 80, type: 5, name: "王子异签名照" }
    ],
    prizes: [
      { prize: "vip", state: "yes" },
      { prize: "red_52", state: "no" },
      { prize: "vip_30", state: "no" },
      { prize: "red_520", state: "no" },
      { prize: "no", state: "no" },
      { prize: "vip_7", state: "no" },
      { prize: "no", state: "no" },
      { prize: "oppo", state: "no" }
    ],
    scrollHeight:200,
    per: 0,
    imagesUrl: app.globalData.imagesUrl,
    popup: false,
    redType: 2,
  },
  onBtnRule: nav.onBtnRule,
  onBtnHome: nav.onBtnHome,
  onGuide: popup.onGuide,
  onClose: popup.onClose,
  upfile: popup.upfile,
  formSubmit: popup.formSubmit,
  bindscroll(e) {
    var _this = this
    var scrollHeight = _this.data.scrollHeight,
      height = e.detail.scrollHeight - scrollHeight,
      top = e.detail.scrollTop;
    var per = parseInt((top / height) * 100)
    _this.setData({
      per: per
    })
    console.log(per)
  },
  // 兑换包
  onReddem(e){
    var id = e.currentTarget.dataset.id
    var _this =this;
    var objs = _this.data.redeems
    var userInfo = _this.data.userInfo
    console.log(objs)
    var title = `确定要消耗${objs[id].score}心跳兑换吗？`
    if(id == 4) title = '解锁视频需要消耗50心跳，是否确定消耗？'
    wx.showModal({
      title: title,
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          var type = objs[id].type
          app.api.exscore(function(data){
            console.log(data)
            wx.showModal({
              showCancel: false,
              title: '恭喜你兑换成功啦~ 前往活动规则了解更多奖品使用信息'
            })
            objs[id].surplus--
            userInfo.score -= objs[id].score
            _this.setData({
              redeems: objs,
              userInfo:userInfo
            })
          }, _this.data.userInfo.score, type)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 启动抽奖
  onBtnLuck(e) {
    var _this = this;
    var userInfo = _this.data.userInfo
    wx.showModal({
      title: '确定要用心跳参与抽奖吗？',
      showCancel: true,
      cancelText: '否',
      confirmText: '是',
      success(res){
        if (res.confirm) {
          app.api.lottery(function(data){
            userInfo.score-=10 
            console.log(data)
            if(data.code == 0){
              _this.funcLuck(function () {
                wx.showModal({
                  title: `恭喜你，获得${data.award_name}奖品`,
                  showCancel: false
                })
                // wx.showModal({
                //   title: '谢谢参与~',
                //   showCancel: false
                // })
                _this.setData({
                  // isPop: true,
                  // isLuck: true,
                  luck: data,
                  userInfo:userInfo
                })
              },data.award_code)
            }
          }, _this.data.userInfo.score)
        }else{

        }
      }
    })

  },
  funcLuck(callback, id) {
    var _this = this
    var isIn = false,   //是开始减速
        speed = 80,     //起始速度
        rise = 50,      //速度增长单位
        i = 1,          //起始位置
        encircle = 5,   //最少圈数
        buffer = 7,     //缓冲数量
        prizes = _this.data.prizes
    console.log(id)
    // if(id == 1 )
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
    var _this =this;
    _this.onUserInfo();
    wx.createSelectorQuery().select('#redeem').boundingClientRect(function (rect) {
      _this.setData({
        scrollHeight:rect.height
      })
    }).exec()
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
  },
  onShareAppMessage: function () {
    return {
      title: `qiaolezi`,
      path: `/pages/index/index`,
      imageUrl: ""
    }
  }
})