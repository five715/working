//app.js
var api = require('/utils/api.js')
var mta = require("/utils/mta_analysis.js")
// const cdnUrl = "http://qq.vogso.com/q2019/sumsang/living0410/pc/img"
const cdnUrl = "https://appmedia.gtimg.com/media/641012973/imgs"
// const cdnUrl = ""
App({
  api: api,
  onLaunch: function () {
    mta.App.init({
      "appID": "500671733",
      "eventID": "500671734",
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
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
    shareImg: ["/images/share.jpg", "/images/share.jpg"],//首页,回流页
    sounds: [
      { music: 1, src: "beats1", color: "red", bt: 0, name: "热情温暖", mta: "44", mSrc: "beats11", tMta: "33"},
      { music: 1, src: "beats2", color: "red", bt: 1, name: "高冷神秘", mta: "45", mSrc: "beats12", tMta: "34" },
      { music: 1, src: "beats3", color: "red", bt: 1, name: "软萌可爱", mta: "46", mSrc: "beats13", tMta: "35" },
      { music: 1, src: "beats4", color: "red", bt: 1, name: "画眉鸟", mta: "18", mSrc: "beats4", tMta: "36"},
      { music: 2, src: "timer", color: "red", bt: 1, name: "时间", mSrc: "" },
      { music: 1, src: "beats5", color: "red", bt: 1, name: "风铃", mta: "19", mSrc: "beats5", tMta: "37"},
      { music: 1, src: "beats6", color: "red", bt: 1, name: "小猫叫", mta: "20", mSrc: "beats6", tMta: "38"},
      { music: 1, src: "beats7", color: "red", bt: 1, name: "honey", mta: "21", mSrc: "beats7", tMta: "39"},
      { music: 1, src: "beats8", color: "red", bt: 1, name: "踢踏舞", mta: "22", mSrc: "beats8", tMta: "40"},
      { music: 1, src: "beats9", color: "red", bt: 1, name: "mua", mta: "15", mSrc: "beats1", tMta: "41"},
      { music: 1, src: "beats10", color: "red", bt: 1, name: "海豚", mta: "16", mSrc: "beats2", tMta: "42"},
      { music: 1, src: "beats11", color: "red", bt: 1, name: "心跳", mta: "17", mSrc: "beats3", tMta: "43"},
    ]
  }
})