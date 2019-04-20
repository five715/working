var popup = require("../../template/popup.js");
const app = getApp();
Page({
  data: {
    fid: "",
    style:1,
    text:"",
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
    selects:["我不但可爱,我还可爱你了", "我咬你的时候,你也要对我笑", "我跟你除恋爱真美什么好谈的", "爱我是真心话,凶我是大冒险", "你的牙印,一定是爱我的小标记", "不许动手,只许动心"],
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
    // var sounds = _this.data.sounds
    // for (var i = 0; i < sounds.length; i++) {
    //   _this.data.audios["beats" + i] = wx.createInnerAudioContext()
    //   _this.data.audios["beats" + i].src = `/sounds/${sounds[i].src}.mp3`
    // }
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
  onLoad(query) {
    var _this = this
    _this.setPageHeight();
    const scene = decodeURIComponent(query.q)
    // const scene = "https://qiaolezi.act.qq.com/e/c/backcode/?18"
    // const fid = query.fid
    var fid = ''
    if (query.fid) {
      fid = query.fid
    }else{
      fid = scene.split("?")[1];
    }
    console.log(query, scene, fid)
    if(!fid) return false

    _this.setData({
      fid: fid
    })

    wx.getSetting({
      success: (res) => {
        console.log(res)
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(e){
              _this.onLogin(e.userInfo)
              _this.setData({
                isBannedClick: true
              })
            }
          })
        }
      }
    })
  },
  getUserInfo(e) {
    var _this = this;
    console.log(e.detail.userInfo)
    if (!e.detail.userInfo) {
      //拒绝授权
      console.log("拒绝授权")
      return false
    }
    wx.checkSession({
      success: (res) => {
        _this.onGetFile();
      },
      fail: (res) => {
        _this.onLogin(e.detail.userInfo)
      }
    })
  },
  onLogin(userInfo) {
    var _this = this;
    app.api.login(function (data) {
      console.log(data)
      if (data.code == 0) {
        _this.onGetFile();
      }
    }, userInfo)
  },
  onGetFile() {
    var _this = this;
    app.api.getFile(function (data) {
      console.log(data)

      var array = data.content.replace(/&#039;/g, '"').replace(/&amp;/g, '&').split("&")
      var con = JSON.parse(array[0].replace(/'/g, '"'));
      var src = array[1]
      con.forEach((c)=>{
        _this.data.audios[c.id] = wx.createInnerAudioContext();
        _this.data.audios[c.id].src = `${app.globalData.soundsUrl}/${c.id}.mp3`
      })
      console.log(con, src, array)

      _this.data.audios["bg"] = wx.createInnerAudioContext()
      _this.data.audios["bg"].src = src
      _this.data.audios.bg.play()
      var arr = src.split("_")
      _this.setData({
        arr: con,
        bgSrc: src,
        style: arr[1].replace(".mp3",""),
        text: _this.data.selects[array[2]-1]
      }, _this.onPlay)
    }, _this.data.fid)
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})