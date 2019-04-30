const app = getApp();
var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
Page({
  data: {
    styles: [
      { index: 1, text: "说唱", css: "" },
      { index: 4, text: "民谣", css: "" },
      { index: 3, text: "摇滚", css: "" },
      { index: 2, text: "中国风", css: "" }
    ],
    obj: [
      "transform: translate3d(50%, 0%, 0px); z-index: 2; animation: move1 0.8s infinite linear alternate ",
      "transform: translate3d(170%, 45%, -800px); z-index: 1;",
      "transform: translate3d(50%, 45%, -900px); z-index: 1;opacity: 0",
      "transform: translate3d(-80%, 45%, -800px); z-index: 1;",
    ],
    audios:[],
    current: 0,
    imagesUrl: app.globalData.imagesUrl,
    select: 0,
    bgTimer: 20000,
    time: 0, //时间
    t: 0, //播放时间
    timer: null, //定时器
    arr: [], //记录数据
    arrInit: [], //人声数据
    pagePosition: 'fixed'
  },
  setPageHeight: popup.setPageHeight,
  onLoad(e) {
    mta.Page.init()
    var _this = this;
    _this.setPageHeight();
    console.log(e)
    app.globalData.style = _this.data.current + 1;
    _this.setData({
      select: e.select
    })

    var styles = _this.data.styles
    for (var i = 1; i <= styles.length; i++) {
      var id = `voice_${e.select}_${i}`
      _this.data.audios[id] = wx.createInnerAudioContext()
      _this.data.audios[id].src = `${app.globalData.soundsUrl}/${id}.mp3`
      _this.data.audios["bg" + i] = wx.createInnerAudioContext()
      _this.data.audios["bg" + i].src = `${app.globalData.soundsUrl}/bgMusic_${i}.mp3`
    }
    console.log(_this.data.audios)
    _this.onMove();
  },
  onBtnMusic(e) {
    var _this = this;
    var styles = _this.data.styles
    var id = e.target.id;
    styles.forEach((s) => {
      if (s.index == id) s.sel = true
      else s.sel = false
    })
    _this.setData({
      styles: styles
    })
    app.globalData.style = id
  },
  onBtnRight(e) {
    this.funcStop()
    switch(app.globalData.style){
      case 1:
        mta.Event.stat(`11`, {})
        console.log(app.globalData.style,"说唱",11)
        break;
      case 2:
        mta.Event.stat(`14`, {})
        console.log(app.globalData.style,"民谣", 14)
        break;
      case 3:
        mta.Event.stat(`13`, {})
        console.log(app.globalData.style,"摇滚", 13)
        break;
      case 4:
        mta.Event.stat(`12`, {})
        console.log(app.globalData.style,"中国风", 12)
        break;
    }
    wx.navigateTo({
      url: `trial?select=${app.globalData.select}&style=${app.globalData.style}&text=${app.globalData.text}`,
    })
  },
  onUnload() {
    this.funcStop()
  },
  bindchange(e) {
    var _this = this;
    console.log(e, e.detail.current)
    _this.setData({
      current: e.detail.current
    }, function () {
      app.globalData.style = _this.data.current
    })
  },
  bindtransition(e) {
    var per = 164 / e.detail.dx
    // console.log(e,per)
  },
  onNext(e) {
    ++this.data.current >= 4 && (this.data.current = 0)
    this.onMove();
  },
  onPrev(e) {
    --this.data.current < 0 && (this.data.current = 3)
    this.onMove();
  },
  onMove() {
    this.funcStop();
    var _this = this,
      obj = _this.data.obj,
      styles = _this.data.styles,
      current = _this.data.current
    
    styles.forEach((s, i) => {
      i += current
      s.css = obj[i > 3 ? i - 4 : i]
    })
    app.globalData.style = current + 1
    _this.setData({
      styles: styles,
      current: current
    })


    var _t = 2000
    if (app.globalData.style == 4) if (_this.data.select == 3 || _this.data.select == 5) _t = 0
    var id = `voice_${_this.data.select}_${app.globalData.style}`
    _this.data.arrInit = [{ id: id, t: _t, s: false }, { id: id, t: _t + 10000, s: false }]


    console.log(_this.data.arrInit,_this.data.select, app.globalData.style)
    setTimeout(function(){
      _this.onPlay(app.globalData.style)
    },70)
  },
  onPlay(style) {
    var _this = this;
    var arr = _this.data.arrInit
    arr.forEach((arr) => {
      arr.s = false
    })
    _this.data.audios[`bg${style}`].play()
    _this.timeDate = new Date().getTime();
    _this.data.timer = setInterval(function () {
      var t = new Date().getTime() - _this.timeDate
      _this.onForAudio(t, arr)
      _this.setData({
        t: t
      })
    }, 100)
  }, 
  onForAudio(t, arrs) {
    var a = t;
    var _this = this;
    if (t >= _this.data.bgTimer) {
      _this.funcStop();
      return false;
    }
    arrs.forEach((arr) => {
      if (t >= arr.t && !arr.s) {
        console.log(a, t, arr)
        _this.data.audios[arr.id].stop()
        _this.data.audios[arr.id].play()
        arr.s = true
      }
    })
  },
  funcStop() {
    var _this = this
    clearInterval(_this.data.timer);
    var audios = _this.data.audios
    for (var audio in audios) {
      audios[audio].stop();
    }
  },
  touchstart(e) {
    this.pageX = e.touches[0].pageX
  },
  touchend(e) {
    var x = e.changedTouches[0].pageX
    if (Math.abs(x - this.pageX) < 70) return false
    if (x > this.pageX) this.onNext()
    else this.onPrev()
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})