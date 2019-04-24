var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
const app = getApp();
Page({
  data: {
    fid: "",
    style: 1,
    text: "",
    sounds: [
      { src: "beats1", color: "red", bt: 1, name: "风铃" },
      { src: "beats2", color: "red", bt: 1, name: "海豚" },
      { src: "beats3", color: "red", bt: 1, name: "心跳" },
      { src: "beats4", color: "red", bt: 1, name: "画眉鸟" },
      { src: "beats5", color: "red", bt: 1, name: "“波”" },
      { src: "beats6", color: "red", bt: 1, name: "小猫叫" },
      { src: "beats7", color: "red", bt: 1, name: "爱你" },
      { src: "beats8", color: "red", bt: 1, name: "踢踏舞" }
    ],
    selects: ["我不但可爱,我还可爱你了", "我咬你的时候,你也要对我笑", "我跟你除了恋爱真没什么好谈的", "爱我是真心话,凶我是大冒险", "你的牙印,一定是爱我的小标记", "不许动手,只许动心"],
    audios: {},
    arr: "",
    bgSrc: "",
    bgTimer: 20000,
    time: 0, //时间
    timer: null, //定时器
    imagesUrl: app.globalData.imagesUrl,
    isPlay: false,
    isBannedClick: false,
    pagePosition: 'fixed'
  },
  setPageHeight: popup.setPageHeight,
  onPlay(arr) {
    var _this = this;
    var arr = _this.data.arr

    if (_this.data.isPlay) return
    _this.data.isPlay = true
    _this.setData({
      isPlay: true
    })
    console.log(arr)
    arr.forEach((arr) => {
      arr.s = false
    })
    var obj = _this.data.sounds
    _this.timeDate = new Date().getTime();
    _this.data.timer = setInterval(function () {
      var t = new Date().getTime() - _this.timeDate
      _this.onForAudio(t, arr)
      _this.setData({
        time: t
      })
    }, 100)
  },
  onForAudio(t, arrs) {
    var a = t;
    var _this = this;
    var obj = _this.data.sounds
    if (t >= _this.data.bgTimer) {
      // _this.timeDate = new Date().getTime();
      _this.funcStop()
      // _this.data.audios.bg.play()
      arrs.forEach((arr) => {
        arr.s = false
      })
      return false;
    } else {
      _this.data.audios.bg.play()
    }
    arrs.forEach((arr) => {
      if (t >= arr.t && !arr.s) {
        console.log(a, t, arr)
        _this.data.audios[arr.id].stop()
        setTimeout(function () {
          _this.data.audios[arr.id].play()
        }, 70)
        // obj[arr.id.split("beats")[1]].color = '#000';
        arr.s = true
      }
    })
    _this.setData({
      sounds: obj
    })
  },
  onReady() {
    var _this = this;
  },
  onUnload() {
    this.funcStop()
  },
  onBtnMix() {
    this.funcStop()
    wx.navigateTo({
      url: '/pages/game/index'
    })
  },
  funcStop() {
    var _this = this
    clearInterval(_this.data.timer);
    var audios = _this.data.audios
    _this.setData({
      isPlay: false
    })
    for (var audio in audios) {
      audios[audio].stop();
    }
  },
  onLoad(e) {
    mta.Page.init()
    var _this = this
    _this.setPageHeight();
    console.log(app.globalData.content)

    var array = app.globalData.content.split("&")
    var con = JSON.parse(array[0].replace(/'/g, '"'));
    var src = array[1]
    console.log()
    con.forEach((c) => {
      _this.data.audios[c.id] = wx.createInnerAudioContext();
      _this.data.audios[c.id].src = `${app.globalData.soundsUrl}/${c.id}.mp3`
    })
    _this.data.audios["bg"] = wx.createInnerAudioContext()
    _this.data.audios["bg"].src = src
    console.log(con, src, array)
    var arr = src.split("_")

    _this.setData({
      arr: con,
      bgSrc: src,
      style: arr[1].replace(".mp3", ""),
      text: _this.data.selects[array[2] - 1],
      audios:_this.data.audios
    })
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})