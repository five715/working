const app = getApp();
var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
Page({
  data: {
    sounds: [
      { music: 1, src: "beats1", color: "red", bt: 1, name: "mua", mta: "15" },
      { music: 1, src: "beats2", color: "red", bt: 1, name: "海豚", mta: "16" },
      { music: 1, src: "beats3", color: "red", bt: 1, name: "心跳", mta: "17" },
      { music: 1, src: "beats4", color: "red", bt: 1, name: "画眉鸟", mta: "18" },
      { music: 2, src: "timer", color: "red", bt: 1, name: "时间" },
      { music: 1, src: "beats5", color: "red", bt: 1, name: "风铃", mta: "19" },
      { music: 1, src: "beats6", color: "red", bt: 1, name: "小猫叫", mta: "20" },
      { music: 1, src: "beats7", color: "red", bt: 1, name: "honey", mta: "21" },
      { music: 1, src: "beats8", color: "red", bt: 1, name: "踢踏舞", mta: "22" },
      { music: 3, src: "beats_no_1", color: "red", bt: 0, name: "敬请期待" },
      { music: 3, src: "beats_no_2", color: "red", bt: 0, name: "敬请期待" },
      { music: 3, src: "beats_no_3", color: "red", bt: 0, name: "敬请期待" }
    ],
    audios: {},
    style: null,
    text: "",
    select: 0,
    bgTimer: 20000,
    isStart: false, //是否开始记录
    isAdvance: false, //是否预创作
    time: 0, //时间
    t: 0, //播放时间
    timer: null, //定时器
    arr: [], //记录数据
    arrInit: [], //人声数据
    bgSrc: "",
    per: 0,
    isCancel: false, //是否可以取消
    scrollHeight: 942,
    scrollPer: 0,
    soundsUrl: app.globalData.soundsUrl,
    imagesUrl: app.globalData.imagesUrl,
    popup: false,
    hintText: ["提交成功!"],
    hintNav: "",
    pagePosition: 'fixed',
    url:""
  },
  onbtnHintMusic: popup.onbtnHintMusic,
  onClose: popup.onClose,
  setPageHeight: popup.setPageHeight,
  onReady() {
    var _this = this;
    var sounds = _this.data.sounds
    for (var i = 0; i < sounds.length; i++) {
      _this.data.audios["beats" + i] = wx.createInnerAudioContext()
    }
  },
  onAudio(e) {
    var _this = this;
    var obj = _this.data.sounds;
    // console.log(e,obj,_this.data.arr)
    if (e.currentTarget.dataset.bt == 0) {
      var type = e.currentTarget.dataset.i + 1
      wx.showModal({
        title: '确定要用100个心跳解锁音效吗？',
        cancelText: '否',
        confirmText: '是',
        success(res) {
          if (res.confirm) {
            app.api.unlock(function (data) {
              console.log(data, obj[type - 1].bt = 1)
              wx.showModal({
                title: '解锁成功！快去Mix你的炫彩音乐吧~',
                showCancel: false
              })
              _this.setData({
                sounds: obj
              })
            }, type)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    }

    var target = e.currentTarget;
    var dataset = target.dataset;
    var audio = _this.data.audios[target.id];
    console.log(e, _this.data.sounds[dataset.i], audio);
    audio.src = dataset.src;
    audio.stop()
    setTimeout(function () {
      audio.play()
    }, 70)
  },
  funcStop(bol) {
    console.log("停止")
    var _this = this
    clearInterval(_this.data.timer);
    var audios = _this.data.audios

    _this.setData({
      isPlay: false
    })
    for (var audio in audios) {
      audios[audio].stop();
      // console.log(audio.split("sounds"),audio)
      if (audio != "bg" && audio.indexOf("voice") == -1 && bol) _this.data.sounds[audio.split("beats")[1]].color = "red";
      _this.setData({
        sounds: _this.data.sounds
      })
    }
  },
  onUnload() {
    this.funcStop()
  },
  onBegin() {
    var _this = this
    var url = ''
    _this.funcStop()
    console.log(_this.data.url)
    wx.navigateTo({
      url: `/pages/game/music?${_this.data.url}`
    })
  },
  onLoad: function (e) {
    mta.Page.init()
    var _this = this;
    for (var i in e) _this.data.url += `${i}=${e[i]}&`
    _this.setPageHeight();
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
      success: function (res) {
        _this.width = res.windowWidth,
          _this.height = res.windowHeight
      }
    });
    var _t = 2000
    if (e.style == 4) if (e.select == 3 || e.select == 5) _t = 0
    var id = `voice_${e.select}_${e.style}`
    _this.data.arrInit = [{ id: id, t: _t, s: false }, { id: id, t: _t + 10000, s: false }]
    _this.data.arr = _this.data.arrInit
    _this.data.audios[id] = wx.createInnerAudioContext()
    _this.data.audios[id].src = `${app.globalData.soundsUrl}/${id}.mp3`


    _this.data.audios["bg"] = wx.createInnerAudioContext()
    _this.data.audios.bg.src = `${app.globalData.soundsUrl}/bgMusic_${e.style}.mp3`

    // console.log(_this.data.arrInit)
    // console.log(_this.data.audios, _this.data.audios.bg.src)

    var sounds = _this.data.sounds;

    // app.api.getStatus(function(data) {
    //   console.log("返回内容："+data, sounds)
    //   for (var bt in data) {
    //     if (bt.indexOf("bt") !== -1) {
    //       sounds.forEach((s)=>{
    //         if(s.music == 1) if(s.src == "beats"+bt.substr(2, 1)) s.bt = data[bt]
    //       })
    //     }
    //   }
    //   console.log(sounds)
    //   _this.setData({
    //     sounds: sounds
    //   })
    //   // _this.data.audios.bg.play()
    //   // _this.onStart();
    // })


    _this.setData({
      style: e.style,
      text: e.text,
      select: e.select,
      bgSrc: _this.data.audios.bg.src
    })

    wx.createSelectorQuery().select('#beats').boundingClientRect(function (rect) {
      _this.setData({
        scrollHeight: rect.height
      })
    }).exec()

  },
  bindscroll(e) {
    var _this = this
    var scrollHeight = _this.data.scrollHeight,
      height = e.detail.scrollHeight - scrollHeight,
      top = e.detail.scrollTop;
    var scrollPer = parseInt((top / height) * 100)
    _this.setData({
      scrollPer: scrollPer
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