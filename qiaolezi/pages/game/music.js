const app = getApp();
Page({
  data: {
    sounds: [
      { music: 1, src: "beats1", color: "red", bt: 1, name: "mua" },
      { music: 1, src: "beats2", color: "red", bt: 1, name: "海豚" },
      { music: 1, src: "beats3", color: "red", bt: 1, name: "心跳" },
      { music: 1, src: "beats4", color: "red", bt: 1, name: "画眉鸟" },
      { music: 2, src: "timer", color: "red", bt: 1, name: "时间" },
      { music: 1, src: "beats5", color: "red", bt: 1, name: "风铃" },
      { music: 1, src: "beats6", color: "red", bt: 1, name: "小猫叫" },
      { music: 1, src: "beats7", color: "red", bt: 1, name: "honey" },
      { music: 1, src: "beats8", color: "red", bt: 1, name: "踢踏舞" },
      { music: 3, src: "beats_no_1", color: "red", bt: 0, name: "敬请期待" },
      { music: 3, src: "beats_no_2", color: "red", bt: 0, name: "敬请期待" },
      { music: 3, src: "beats_no_3", color: "red", bt: 0, name: "敬请期待" }
    ],
    audios: {},
    style:null,
    text:"",
    select:0,
    bgTimer: 20000,
    isStart: false, //是否开始记录
    isAdvance: false, //是否预创作
    time: 0, //时间
    t: 0, //播放时间
    timer: null, //定时器
    arr: [], //记录数据
    arrInit: [], //人声数据
    bgSrc:"",
    per:0,
    isCancel: false, //是否可以取消
    scrollHeight: 942,
    scrollPer: 0,
    soundsUrl: app.globalData.soundsUrl,
    imagesUrl: app.globalData.imagesUrl,
  },
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
    console.log(e,obj,_this.data.arr)
    if (e.currentTarget.dataset.bt == 0) {
      var type = e.currentTarget.dataset.i + 1
      wx.showModal({
        title: '确定要用100个心跳解锁音效吗？',
        cancelText: '否',
        confirmText: '是',
        success(res) {
          if (res.confirm) {
            app.api.unlock(function(data) {
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
    if (!_this.data.isStart) return false;

    var target = e.currentTarget;
    console.log(e,target)
    var dataset = target.dataset;
    var audio = _this.data.audios[target.id];
    // console.log(e,_this.data.sounds[dataset.i],dataset.i);
    if(_this.data.arr.length == 6){
      wx.showModal({
        title: '音效选择数量已经达上限（一首最多可选4个beats可叠加使用，之后再添加会弹出此弹层提示）',
        showCancel: false
      })
      return false
    }
    if (obj[dataset.i].color == "red") {
      obj[dataset.i].color = "#000";
      audio.src = dataset.src;
      console.log(audio)
      audio.play();
    } else {
      if (!_this.data.isCancel) return false
      obj[dataset.i].color = "red"
      audio.stop()
    }
    _this.setData({
      sounds: obj
    })
    // console.log(audio);
    if (_this.data.isStart) {
      var o = {}
      o.id = e.target.id
      if (obj[dataset.i].color == "red") {
        o.e = new Date().getTime() - _this.timeDate;
        for (var i = 0; i < _this.data.arr.length; i++) {
          if (_this.data.arr[i].id == o.id) _this.data.arr.splice(i, 1)
        }
        console.log(_this.data.arr)
      } else {
        o.t = new Date().getTime() - _this.timeDate;
        _this.data.arr.push(o)
      }
      console.log(_this.data.arr)
    }
  },
  onStart() {
    var _this = this;
    _this.funcStop();
    _this.data.audios.bg.play()
    this.setData({
      isStart: true,
      arr:_this.data.arrInit
    }, function() {
      _this.timeDate = new Date().getTime();
      _this.data.timer = setInterval(function() {
        var t = new Date().getTime() - _this.timeDate
        _this.onForAudio(t, _this.data.arr)
        _this.setData({
          time: parseInt(t/1000),
          per : t / _this.data.bgTimer*100
        })
      }, 100)
    })
  },
  onEnd() {
    var _this = this;
    _this.data.arr.forEach((arr) => {
      arr.s = false
    })
    console.log(_this.data.arr)
    this.setData({
      isStart: false,
      isAdvance: true
    })
    _this.funcStop(1)
  },
  funcStop(bol) {
    console.log("停止")
    var _this = this
    clearInterval(_this.data.timer);
    var audios = _this.data.audios
    for (var audio in audios) {
      audios[audio].stop();
      // console.log(audio.split("sounds"),audio)
      if (audio != "bg" && audio.indexOf("voice") == -1 && bol) _this.data.sounds[audio.split("beats")[1]].color = "red";
      _this.setData({
        sounds: _this.data.sounds
      })
    }
  },
  onPlay() {
    var _this = this;
    var arr = _this.data.arr
    arr.forEach((arr) => {
      arr.s = false
    })
    _this.data.audios.bg.play()
    var obj = _this.data.sounds
    _this.timeDate = new Date().getTime();
    _this.data.timer = setInterval(function() {
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
    var obj = _this.data.sounds
    if (t >= _this.data.bgTimer) {
      // _this.timeDate = new Date().getTime();
      _this.data.audios.bg.stop()
      // _this.setData({
      //   isStart:false
      // })
      _this.funcStop();
      // _this.data.audios.bg.play()
      // arrs.forEach((arr) => {
      //   arr.s = false
      // })
      return false;
    } else {
      // _this.data.audios.bg.play()
    }
    arrs.forEach((arr) => {
      if (t >= arr.t && !arr.s) {
        console.log(a, t, arr)
        _this.data.audios[arr.id].stop()
        setTimeout(function(){
          _this.data.audios[arr.id].play()
        },70)
        obj.forEach((o)=>{
          if(o.src == arr.id) o.color == "#000"
        })
        // obj[arr.id.split("beats")[1]].color = '#000';
        arr.s = true
      }
    })
    _this.setData({
      sounds: obj
    })
  },
  onUnload(){
    this.funcStop()
  },
  onLoad: function(e) {
    var _this = this;
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
      success: function (res) {
        _this.width = res.windowWidth,
          _this.height = res.windowHeight
      }
    });
    var _t = 2000
    if(e.style == 4) if(e.select == 3 || e.select == 5) _t = 0
    var id = `voice_${e.select}_${e.style}`
    _this.data.arrInit = [{ id: id, t: _t, s: false }, { id: id, t: _t+10000, s: false }]

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
      style:e.style,
      text: e.text,
      select: e.select,
      bgSrc:_this.data.audios.bg.src
    })

    wx.createSelectorQuery().select('#beats').boundingClientRect(function (rect) {
      _this.setData({
        scrollHeight: rect.height
      })
    }).exec()

  },
  onAnew() {
    var _this = this;
    wx.navigateBack({
      delta: 2
    })
    _this.funcStop();
    _this.setData({
      isAdvance: false,
      time: 0,
      t: 0,
      per:0,
      isStart:false
    })
  },
  onCreate() {
    var _this = this;
    _this.funcStop();
    var arr = _this.data.arr;
    // console.log(JSON.parse(JSON.stringify(arr)), JSON.stringify(arr).replace(/"/g,"'"))
    app.api.saveFile(function(data){
      console.log(data)
      wx.showModal({
        title: data.status == 0 ? '提交成功,但不加分' : (data.status == 1 && '提交作品加1分'),
        showCancel: false,
        complete() {
          wx.navigateTo({
            url: `create?fid=${data.fid}&selects=${_this.data.select}&style=${_this.data.style}`
          })
        }
      })
    }, `${JSON.stringify(arr).replace(/"/g, "'")}&${_this.data.bgSrc}&${_this.data.select}`)
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
      title: 'qiaolezi',
      path: `/pages/index/foreshow`,
      imageUrl: ""
    }
  }
})