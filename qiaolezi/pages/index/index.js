var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
const app = getApp();
Page({
  data: {
    isInput: false, //是否输入状态
    isEnd: false, //活动是否结束
    red: 0, //0代表关闭弹窗 || 0.33, 0.52, 1.17, 1.25, 3.33, 99显示弹窗
    isInfo: 1,
    isGuide: false,
    idCard: ["", ""],
    excode: "", //棒签兑换码
    isOne: true,
    openRed: false,
    per: 0,
    isVideo: true,
    search: '',
    hint: false,
    hintText: ["该串码已被使用~"],
    imagesUrl: app.globalData.imagesUrl,
    videoUrl: app.globalData.videoUrl,
    popup: false,
    redType: 1,
    videoLeft: 0
  },
  onBtnRule: nav.onBtnRule,
  onGuide: popup.onGuide,
  onClose: popup.onClose,
  upfile: popup.upfile,
  formSubmit: popup.formSubmit,
  onOver() {
    this.setData({
      popup: 'hintOver',
      hintText: ['巧乐兹扫码抢红包活动已结束', '不过巧乐兹”喜欢就给他点颜色“活动', '仍在进行, 快来MIX你的炫彩音乐吧!']
    })
  },
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
  onReady(e) {
    this.videoContext = wx.createVideoContext('indexVideo')
  },
  // onShow() {
  //   if (this.data.isOne) return false;
  //   this.setData({
  //     openRed: false
  //   })
  // },
  onLoad(query) {
    var _this = this;
    if (query.isSkip) _this.bindended()
    console.log(query)
    const scene = decodeURIComponent(query.q)
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/5";
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/XXXXXXXYYYYY";
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/"
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/fid=19"
    if (!scene || scene == 'undefined') return false
    this.onIf(scene)
  },
  onIf(scene) {
    var _this = this;
    var arr = scene.split("/");
    _this.code = arr[arr.length - 1]
    // if(_this.code.indexOf("fid") !== -1){
    //   wx.navigateTo({
    //     url: '/pages/back/index'
    //   })
    //   return false
    // }
    if (_this.code.length == 13) {
      //带兑换码进入
      _this.onExcode()
    }
  },
  bindplay(e) {
    console.log(e)
    setTimeout(this.bindended, 5000)
  },
  bindtimeupdate(e) {
    var c = e.detail.currentTime,
      d = e.detail.duration;
    if (c / d > 0.9) {
      this.bindended()
    }
  },
  bindended(e) {
    app.globalData.bgm.play()
    // this.videoContext.seek(4.5)
    this.setData({
      isVideo: false,
      per: -1,
      videoLeft: "850"
    })
  },
  bindprogress(e) {
    var _this = this;
    if (!_this.data.isVideo) return false;
    var per = e.detail.buffered
    _this.setData({
      per: per
    }, function () {
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
    if (!e.detail.userInfo) {
      //拒绝授权
      console.log("拒绝授权")
      return false
    }

    app.globalData.userInfo = e.detail.userInfo
    wx.checkSession({
      success: (res) => {
        if (!click) _this.onExcode();
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
  onClick(click) {
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
  onLogin(userInfo, callback) {
    var _this = this;
    app.api.login(function (data) {
      console.log(data)
      if (data.code == 0) {
        callback()
      }
    }, userInfo)
  },
  onExcode(e) {
    var _this = this;
    var code = _this.code || _this.data.excode
    console.log(e, code)
    if (code.length !== 13) {
      _this.setData({
        popup: 'hint',
        hintText: ['需要13位兑换码']
      })
      return
    }
    if (_this.isExcode) return
    _this.isExcode = true
    var paramater = app.api.getStorage()
    app.api.excode(function (data) {
      _this.isExcode = false
      var search = `?lid=${data.lid}&openid=${paramater.loginData}`
      console.log(data, search, paramater)
      _this.data.award_id = data.award_id
      if (data.code == -1) {
        _this.setData({
          popup: 'hint',
          hintText: [data.message]
        })
        return false
      }
      if (data.ret == 6) {
        _this.setData({
          popup: 'info'
        })
        return false;
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
  onBtnOpen(e) {
    var _this = this;
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
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})