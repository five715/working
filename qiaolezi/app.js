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

  }
})