const app = getApp();
Page({
  data: {
    sounds: [
      {src: "beats1", color: "red", bt: 0},
      {src: "beats2", color: "red", bt: 0}
    ],
    audios: {},
    bgTimer: 30000,
    isStart: false, //是否开始记录
    isAdvance: false, //是否预创作
    time: 0, //时间
    t: 0, //播放时间
    timer: null, //定时器
    arr: [] //记录数据
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

    console.log(e)
    if (e.target.dataset.bt == 0) {
      var type = e.target.dataset.i + 1
      wx.showModal({
        title: '解锁beats',
        content: '点击确认解锁当前beats',
        success(res) {
          if (res.confirm) {
            app.api.unlock(function(data) {
              console.log(data, obj[type - 1].bt = 1)

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

    var target = e.target;
    var dataset = target.dataset;
    var audio = _this.data.audios[target.id];
    // console.log(e,_this.data.sounds[dataset.i],dataset.i);
    if (obj[dataset.i].color == "red") {
      obj[dataset.i].color = "#000";
      audio.src = dataset.src;
      audio.play();
    } else {
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
    this.setData({
      isStart: true,
      arr: []
    }, function() {
      _this.timeDate = new Date().getTime();
      _this.data.timer = setInterval(function() {
        var t = new Date().getTime() - _this.timeDate
        _this.onForAudio(t, _this.data.arr)
        _this.setData({
          time: t
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
    }, _this.funcStop)
  },
  funcStop() {
    var _this = this
    clearInterval(_this.data.timer);
    var audios = _this.data.audios
    for (var audio in audios) {
      audios[audio].stop();
      // console.log(audio.split("sounds"),audio)
      if (audio != "bg") _this.data.sounds[audio.split("beats")[1]].color = "red";
      _this.setData({
        sounds: _this.data.sounds
      })
    }
  },
  onPlay() {
    var _this = this;
    var arr = _this.data.arr
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
  onLoad: function(e) {
    var _this = this;
    var sounds = _this.data.sounds;
    app.api.getStatus(function(data) {
      console.log(data, sounds)
      for (var bt in data) {
        if (bt.indexOf("bt") !== -1) {
          if (data[bt] == 1) {
            sounds[bt.substr(2, 1) - 1].bt = 1
          }
        }
      }
      _this.setData({
        sounds: sounds
      })
    })

    _this.data.audios["bg"] = wx.createInnerAudioContext()
    _this.data.audios.bg.src = `/sounds/bgMusic_${e.select}_${e.music}.mp3`
    console.log(_this.data.audios,_this.data.audios.bg.src)
  },
  onAnew() {
    this.funcStop();
    this.setData({
      isAdvance: false,
      time: 0,
      t: 0
    })
  },
  onCreate() {
    this.funcStop();
    var arr = this.data.arr;
    // console.log(JSON.parse(JSON.stringify(arr)), JSON.stringify(arr).replace(/"/g,"'"))
    app.api.saveFile(function(data){
      console.log(data)
      wx.navigateTo({
        url: `create?fid=${data.fid}`
      })
    }, JSON.stringify(arr).replace(/"/g, "'"))
  }
})