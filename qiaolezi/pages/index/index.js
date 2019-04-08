var nav = require("../../template/nav.js");
const app = getApp();
Page({
  data: {
    isInput: false, //是否输入状态
    isEnd: false, //活动是否结束
    red: 0, //0代表关闭弹窗 || 0.33, 0.52, 1.17, 1.25, 3.33, 99显示弹窗
    isInfo: 0,
    isGuide: false,
    idCard: ["", ""],
    excode: "", //棒签兑换码
    isOne : true,
    openRed: false,
    per:0,
    isVideo:true,
    search: '',
    hint:false,
    hintText:"该串码已被使用~"
  },
  onBtnRule: nav.onBtnRule,
  onPlay() {
    wx.navigateTo({
      url: '/pages/game/index'
    })
  },
  onBtnStore() {
    wx.navigateTo({
      url: '/pages/store/index'
    })

  },
  onClose() {
    this.setData({
      red: 0,
      isGuide: false,
      hint:0
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
  onShow(){
    if (this.data.isOne) return false;
    this.setData({
      openRed: false
    })
  },
  onLoad(query) {
    var _this = this;
    if (query.isSkip) _this.bindended()
    console.log(query)


    



    const scene = decodeURIComponent(query.q)
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/XXXXXXXYYYYYY";      //线下
    if (!scene || scene == 'undefined') return false
    this.onIf(scene)
  },
  onIf(scene) {
    var _this = this;
    var arr = scene.split("/");
    _this.code = arr[arr.length - 1]
    if (_this.code.length == 13) {
      //带兑换码进入
      _this.onExcode()
    }
  },
  bindtimeupdate(e){
    var c = e.detail.currentTime,
        d = e.detail.duration;
      if(c/d>0.9){
        this.bindended()
      }
  },
  bindended(e){
    app.globalData.bgm.play()
    // this.videoContext.seek(4.5)
    this.setData({
      isVideo: false,
      per: -1
    })
  },
  bindprogress(e){
    var _this = this;
    if(!_this.data.isVideo) return false;
    var per = e.detail.buffered
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
    var click = e.target.dataset.click;

    console.log(e)

    if (!e.detail.userInfo){
      //拒绝授权
      console.log("拒绝授权")
      return false
    }

    wx.checkSession({
      success: (res) => {
        if(!click) _this.onExcode();
        else _this.onClick(click)
      },
      fail: (res) => {
        _this.onLogin(e.detail.userInfo, function () {
          if (!click) _this.onExcode()
          else _this.onClick(click)
        })
      }
    })
  },
  onClick(click){
    var _this = this
    console.log(click)
    if (click == "onBtnStore") {
      _this.onBtnStore();
    } else if (click == "onBtnRule") {
      _this.onBtnRule();
    } else if (click == "onPlay") {
      _this.onPlay();
    }
  },
  onLogin(userInfo,callback) {
    var _this = this;
    app.api.login(function(data) {
      console.log(data)
      if (data.code == 0) {
        callback()
      }
    }, userInfo)
  },
  onExcode(e) {
    var _this = this;
    var code = _this.code || _this.data.excode
    console.log(e)
    var paramater = app.api.getStorage()
    app.api.excode(function(data) {
      var search = `?lid=${data.lid}&openid=${paramater.loginData}`
      console.log(data, search, paramater)
      if(data.code == -1){
        _this.setData({
          hint:1,
          hintText:data.message
        })
        return false
      }
      wx.sendBizRedPacket({
        timeStamp: data.timeStamp, // 支付签名时间戳，
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, //扩展字段，由商户传入
        signType: 'MD5', // 签名方式，
        paySign: data.paySign, // 支付签名
        success: function (res) {
          console.log(res)
        },
        fail: function (res) { 
          console.log(res)
        },
        complete: function (res) { 
          console.log(res)
        }
      })

      _this.setData({
        // openRed: true,
        search: search
      })

    }, code, _this.code ? 2 : 1)

  },
  onBtnOpen(e){
    var _this =this;
    var search = _this.data.search
    _this.data.isOne = false
    wx.navigateTo({
      url: `/pages/web/web${search}`
    })
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
    console.log(e,obj)

    //关闭弹窗
    _this.setData({
      isInfo: false
    })
  },
  upfile: function (e) {
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
  getPhoneNumber(e) {
    wx.getSetting({
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        console.log(res)
      },
    })
    app.api.savetel(function (data) {
      console.log(data)
    }, e.detail.encryptedData, e.detail.iv, app.globalData["lid"])
  },
  onShareAppMessage: function () {
    return {
      title: 'qiaolezi',
      path: `/pages/index/index`,
      imageUrl: ""
    }
  }
})