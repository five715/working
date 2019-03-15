var nav = require("../../template/nav.js");
var mta = require('../../utils/mta_analysis.js')
const app = getApp();
Page({
  data: {
    isInput: false, //是否输入状态
    isEnd: false, //活动是否结束
    red: 0, //0代表关闭弹窗 || 0.33, 0.52, 1.17, 1.25, 3.33, 99显示弹窗
    isInfo: false,
    isGuide: false,
    idCard: ["", ""],
    excode: "", //棒签兑换码
    per:0,
    isVideo:true
  },
  onBtnRule: nav.onBtnRule,
  onPlay() {
    wx.navigateTo({
      url: '/pages/game/index'
    })
  },
  onBtnRule() {
    console.log("活动规则")
  },
  onBtnStore() {
    wx.navigateTo({
      url: '/pages/store/index'
    })

  },
  onClose() {
    this.setData({
      red: 0,
      isGuide: false
    })
  },
  // 获取焦点
  bindFocus(e) {
    this.setData({
      isInput: true
    })
  },
  // 失去焦点
  bindBlur(e) {
    var _this = this;
    this.setData({
      isInput: _this.data.excode ? true : false
    })
  },
  //输入棒签
  bindInput(e) {
    this.setData({
      excode: e.detail.value
    })
  },
  onReady(e){
    this.videoContext = wx.createVideoContext('indexVideo')
  },
  onLoad(e) {
    var _this = this;
    // mta.Page.init();
    // mta.Event.stat("01",{})
    // this.getUserInfo();
    // sendBizRedPacket
    wx.sendBizRedPacket({
      timeStamp: "demo",
      nonceStr: "demo",
      package: "demo",
      signType: "MD5",
      paySign: "70f47031c8e8d4bb78e741f8d0ee45beef65cfcd",
      success: function (res) {
        console.log('红包success',res)
      },
      fail: function (res) {
        console.log('红包fail',res)
      },
      complete: function (res) {
        console.log('红包complete',res)
        // wx.showModal({
        //   title: '红包complete',
        //   content: '红包complete',
        // })
      }
    })
  },
  bindended(e){
    this.setData({
      isVideo: false,
      per: -1
    })
  },
  bindprogress(e){
    var per = e.detail.buffered
    var _this = this;
    _this.setData({
      per: per
    },function(){
      if (per >= 100) {
        _this.videoContext.play();
        _this.setData({
          per: -1
        })
      }
    })
  },
  getUserInfo(e) {
    var _this = this;
    console.log(e)
    wx.checkSession({
      success: (res) => {
        _this.onExcode();
      },
      fail: (res) => {
        _this.onLogin(e.detail.userInfo)
      }
    })
  },
  onLogin(userInfo) {
    var _this = this;
    app.api.login(function(data) {
      console.log(data)
      if (data.code == 0) {
        _this.onExcode();
      }
    }, userInfo)
  },
  onExcode() {
    var _this = this;
    var code = _this.data.excode
    app.api.excode(function(data) {
      console.log(data)
      app.globalData["lid"] = data.lid
      _this.setData({
        red: data.ret
      })
    }, code, 1)
  },
  onRedBtn(e) {
    this.setData({
      isInfo: true,
      red: 0
    })
  },
  formSubmit(e) {
    var _this = this;
    var obj = e.detail.value;
    obj.idCard = _this.data.idCard
    console.log(obj)

    //关闭弹窗
    _this.setData({
      isInfo: false
    })
  },
  upfile: function(e) {
    var id = e.currentTarget.id
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        var arr = _this.data.idCard
        console.log(res, tempFilePaths)
        arr[id] = tempFilePaths
        _this.setData({
          idCard: arr
        })
      }
    })
  },
  onGuide() {
    this.setData({
      isGuide: true
    })
  },
  getPhoneNumber(e){
    wx.getSetting({
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        console.log(res)
      },
    })
    app.api.savetel(function(data){
      console.log(data)
    },e.detail.encryptedData, e.detail.iv, app.globalData["lid"])
  }


})