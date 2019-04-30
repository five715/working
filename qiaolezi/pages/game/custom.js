var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
const app = getApp();
Page({
  data: {
    fid: "",
    style: 1,
    text: "",
    sounds: app.globalData.sounds,
    selects: ["我不但可爱,我还可爱你了", "我咬你的时候,你也要对我笑", "我跟你除了恋爱真没什么好谈的", "爱我是真心话,凶我是大冒险", "你的牙印,一定是爱我的小标记", "不许动手,只许动心"],
    audios: {},
    arr: "",
    bgSrc: "",
    select:'',
    bgTimer: 20000,
    time: 0, //时间
    timer: null, //定时器
    imagesUrl: app.globalData.imagesUrl,
    isPlay: false,
    isBannedClick: false,
    pagePosition: 'fixed'
  },
  onbtnHintMusic: popup.onbtnHintMusic,
  onClose: popup.onClose,
  setPageHeight: popup.setPageHeight,
  onPlay(arr) {
    var _this = this;
    _this.funcStop()
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
    con.forEach((c) => {
      console.log(c)
      _this.data.audios[c.id] = wx.createInnerAudioContext();
      // if(c.id == "beats13" || c.id == "beats12" || c.id == "beats11"){
      //   _this.data.audios[c.id].src = `/sounds/${c.id}.mp3`
      // }else{
        _this.data.audios[c.id].src = `${app.globalData.soundsUrl}/${c.id}.mp3`
      // }
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
      audios:_this.data.audios,
      select:array[2]
    })
  },
  onUnload() {
    this.funcStop()
  },
  onAnew() {
    var _this = this;
    _this.funcStop();
    wx.navigateBack({
      delta: 4
    })
    _this.setData({
      t: 0
    })
  },
  onCreate() {
    var _this = this;
    _this.funcStop();
    // console.log(JSON.parse(JSON.stringify(arr)), JSON.stringify(arr).replace(/"/g,"'"))
    app.api.saveFile(function (data) {
      var title = data.status == 0 ? ['提交成功!'] : (data.status == 1 && ['作品提交成功！获得1个心跳值~', '可前往心跳商城参与奖品兑换和幸运抽奖哦~'])
      _this.setData({
        popup: "hintMusic",
        hintText: title,
        hintNav: `create?fid=${data.fid}&selects=${_this.data.select}&style=${_this.data.style}`
      })
    }, app.globalData.content)
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})