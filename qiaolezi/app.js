//app.js
var api = require('/utils/api.js')
App({
  api: api,
  onLaunch: function () {
    api.init();

    this.globalData.bgm = wx.createInnerAudioContext()
    this.globalData.bgm.src = "/sounds/bgm.mp3"
    this.globalData.bgm.loop = true
  },
  globalData: {
    soundsUrl: 'http://qq.vogso.com/q2019/sumsang/living0410/pc/sounds',
    imagesUrl: 'http://qq.vogso.com/q2019/sumsang/living0410/pc/img'
  }
})