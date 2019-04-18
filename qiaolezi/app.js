//app.js
var api = require('/utils/api.js')
// const cdnUrl = "http://qq.vogso.com/q2019/sumsang/living0410/pc/img"
const cdnUrl = "https://appmedia.gtimg.com/media/641012973/imgs"
// const cdnUrl = ""
App({
  api: api,
  onLaunch: function () {
    api.init();

    this.globalData.bgm = wx.createInnerAudioContext()
    this.globalData.bgm.src = `https://appmusic.gtimg.com/music/641012973/imgs/music/bgm.mp3`
    // this.globalData.bgm.src = `/sounds/bgm.mp3`
    this.globalData.bgm.loop = true
  },
  globalData: {
    soundsUrl: `https://appmusic.gtimg.com/music/641012973/imgs/music`,
    // soundsUrl: `${cdnUrl}/music`,
    imagesUrl: `${cdnUrl}/images`,
    videoUrl: `${cdnUrl}/video`,
    shareTitle: ["MIX的炫彩音乐 唱给你听～", "说不出的话唱给你听(* /ω＼*)"],  //首页,回流页
    shareImg: ["/images/share.jpg", "/images/share.jpg"]//首页,回流页
  }
})