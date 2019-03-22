const app = getApp();
Page({
  data: {
    fid: "",
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
    audios: {},
    arr:"",
    bgSrc:"",
    bgTimer: 30000,
    time: 0, //时间
    timer: null //定时器
  },
  onPlay(arr) {
    var _this = this;
    var arr = _this.data.arr
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
      _this.timeDate = new Date().getTime();
      _this.data.audios.bg.stop()
      _this.data.audios.bg.play()
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
        _this.data.audios[arr.id].play()
        obj[arr.id.split("beats")[1]].color = '#000';
        arr.s = true
      }
    })
    _this.setData({
      sounds: obj
    })
  },
  onReady() {
    var _this = this;
    var sounds = _this.data.sounds
    for (var i = 0; i < sounds.length; i++) {
      _this.data.audios["beats" + i] = wx.createInnerAudioContext()
      _this.data.audios["beats" + i].src = `/sounds/${sounds[i].src}.mp3`
    }
  },
  onLoad(query) {
    var _this =this
    const scene = decodeURIComponent(query.q)

    console.log(query.fid, scene)
    _this.setData({
      fid: query.fid
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
      var array = data.content.split("&")
      var con = JSON.parse(array[0].replace(/'/g, '"'));
      var src = array[1]

      _this.data.audios["bg"] = wx.createInnerAudioContext()
      _this.data.audios["bg"].src = src
      _this.data.audios.bg.play()

      _this.setData({
        arr: con,
        bgSrc: src
      },_this.onPlay)
    }, _this.data.fid)
  }
})