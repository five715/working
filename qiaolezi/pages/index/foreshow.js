var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
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
    videoPer: 0,
    isVideo: true,
    search: '',
    hint: false,
    hintText: ["请保留好您的棒签串码和脆筒二维码，活动将于4月22日正式上线，敬请期待！"],
    imagesUrl: app.globalData.imagesUrl,
    videoUrl: app.globalData.videoUrl,
    popup: false,
    redType: 1,
    videoLeft:0,
    videoMuted: false,
    per: {},
    scrollHeight: {},
    scrollT: {},
    isBmd:true,
    pagePosition:'fixed'
  },
  onBtnRule: nav.onBtnRule,
  onGuide: popup.onGuide,
  onClose: popup.onClose,
  upfile: popup.upfile,
  formSubmit: popup.formSubmit,
  bindscroll: popup.bindscroll,
  setPageHeight:popup.setPageHeight,
  onOver() {
    this.setData({
      popup: 'hintOver',
      hintText: ['巧乐兹扫码抢红包活动已结束', '不过巧乐兹”喜欢就给他点颜色“活动', '仍在进行, 快来MIX你的炫彩音乐吧!']
    })
  },
  onPlay() {
    mta.Event.stat(`09`, {})
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
  onShow() {
  //   console.log(this.data.isOne, 321)
  //   if (!this.data.isOne) return false;
  //   this.data.isOne = false
  //   this.setData({
  //     openRed: false
  //   })
    if (!this.data.isVideo) app.globalData.bgm.play()
  },
  onUnload(e){
    app.globalData.bgm.stop()
  },
  onLoad(query) {
    mta.Page.init()
    var _this = this;

    this.setPageHeight();

    console.log(query,this)
    const scene = decodeURIComponent(query.q)
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/6";
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/XXXXXXXYYYYYY";
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/"
    if (!scene || scene == 'undefined') {
      //小程序码进入
      if (!query.isSkip){
        console.log("直接进入07")
        mta.Event.stat(`07`, {})
      }
    }else{
      this.onIf(scene)
    }
    if (query.isSkip) _this.bindended()
  },
  onIf(scene) {
    var _this = this;
    var arr = scene.split("/");
    _this.code = arr[arr.length - 1]

    var code = _this.code
    _this.setData({
      code: code
    })
    console.log(code)

    if (code.length == 13) {
      //带兑换码进入
      console.log("06")
      mta.Event.stat(`06`, {})
      _this.setData({
        isPopCdkey: true
      })
    } else if (code <= 5 && code > 0) {
      //指定五个地址
      console.log(`0${code}`)
      mta.Event.stat(`0${code}`, {})
    } else if (code == 6) {
      console.log(code, "08")
      mta.Event.stat(`08`, {})
    } else {
      //小程序码进入
      console.log("07")
      mta.Event.stat(`07`, {})
    }
  },
  bindplay(e){
    console.log(e)
    this.setData({
      videoPer: -1
    })
    setTimeout(this.bindended,5000)
  },
  bindtimeupdate(e) {
    var c = e.detail.currentTime,
      d = e.detail.duration;
    if (c / d > 0.9) {
      this.bindended()
    }
  },
  bindended(e) {
    var _this = this;
    if(_this.isVideoEnd) return false
    app.globalData.bgm.play()
    // this.videoContext.seek(5)
    this.setData({
      isVideo: false,
      videoPer: -1,
      videoLeft:"850",
      videoMuted:true
    })
    _this.isVideoEnd = true

    //活动开始
    // app.api.checkTime(function(data){
    //   console.log(data)
    //   if(data.code == -1){
    //     _this.setData({
    //       popup: 'hint',
    //       hintText: ['请保留好您的棒签串码和脆筒二维码，活动将于4月22日正式上线，敬请期待！'],
    //       isBmd:true
    //     })
    //   }else{
        _this.setData({
          isBmd:false
        })
    //   }
    // })
    //活动开始end

    if (!_this.code) return false
    if (_this.code.length !== 13) return false
    //带兑换码进入
    wx.getUserInfo({
      success(e) {
        _this.onExcode()
      },
      fail(e) {
        console.log(e)
        _this.setData({
          popup: "impower",
          hintText: ['请点击打开用户信息权限']
        })
      }
    })
  },
  bindprogress(e) {
    var _this = this;
    if (!_this.data.isVideo) return false;
    var per = e.detail.buffered
    _this.setData({
      vidoePer: per
    }, function () {
      if (per >= 100) {
        _this.videoContext.play();
        _this.setData({
          vidoePer: -1
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
    if (_this.data.isBmd){
      app.api.bmd(function (res) {
        console.log(res)
        if (res.code == 0) {
          code0()
        } else {
          _this.setData({
            popup: 'hint',
            hintText: ['请保留好您的棒签串码和脆筒二维码，活动将于4月22日正式上线，敬请期待！']
          })
        }
      })
    }else{
      code0()
    }
    function code0(){
      _this.setData({
        popup: false
      })
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

    }
  },
  onClick(click) {
    var _this = this
    console.log(click)
    if (click == "onBtnStore") {
      _this.onBtnStore();
      app.globalData.bgm.stop()
    } else if (click == "onBtnRule") {
      _this.onBtnRule();
    } else if (click == "onPlay") {
      _this.onPlay();
      app.globalData.bgm.stop()
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
    if(!_this.code){
      //点击兑换
      console.log(24,'输入串码兑换')
      mta.Event.stat(`24`, {})
    }else{
      // 扫码兑换
    }

    console.log(e,code,code.length)
    // if(code.length !== 13) {
    //   _this.setData({
    //     popup: 'hint',
    //     hintText: ['需要13位兑换码']
    //   })
    //   return
    // }
    // console.log(code.length)
    if (_this.isExcode) return
    _this.isExcode = true
    var paramater = app.api.getStorage()
    
    app.api.excode(function (data) {
      _this.isExcode = false
      _this.code = null
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
      if(data.ret == 0){
        _this.setData({
          popup:'hint',
          hintText: ['您输入的棒签码已兑换或者无效，请输入正确的棒签码']
        })
        return false
      }
      // 红包抽取成功
      mta.Event.stat(`25`, {})
      if (data.ret == 6) {
        _this.setData({
          popup: 'info'
        })
        return false;
      }
      // 小额红包
      wx.sendBizRedPacket({
        timeStamp: data.timeStamp+"", // 支付签名时间戳，
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, //扩展字段，由商户传入
        signType: 'MD5', // 签名方式，
        paySign: data.paySign, // 支付签名
        success: function (res) {
          console.log(res,'成功')
          app.api.updateLottery(function(resDate){
            console.log(resDate)
          }, data.award_id)
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