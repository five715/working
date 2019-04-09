//app.js
var api = require('/utils/api.js')
// const cndUrl = "http://qq.vogso.com/q2019/sumsang/living0410/pc/img"
const cndUrl = "https://appmusic.gtimg.com/music/641012973/imgs"
// const cndUrl = ""
App({
  api: api,
  onLaunch: function () {
    api.init();

    this.globalData.bgm = wx.createInnerAudioContext()
    this.globalData.bgm.src = "/sounds/bgm.mp3"
    this.globalData.bgm.loop = true
  },
  globalData: {
    soundsUrl: `${cndUrl}/music`,
    imagesUrl: `${cndUrl}/images`,
    videoUrl: `${cndUrl}/video`
  }
})