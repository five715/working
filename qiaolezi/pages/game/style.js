const app = getApp();
Page({
  data: {
    styles: [
      { index: 1, text: "说唱", css: "" },
      { index: 2, text: "民谣", css: "" },
      { index: 3, text: "摇滚", css: "" },
      { index: 4, text: "中国风", css: "" }
    ],
    obj: [
      "transform: translate3d(50%, 0%, 0px); z-index: 2; animation: move1 0.8s infinite linear alternate ",
      "transform: translate3d(170%, 45%, -800px); z-index: 1;",
      "transform: translate3d(50%, 45%, -900px); z-index: 1;opacity: 0",
      "transform: translate3d(-80%, 45%, -800px); z-index: 1;",
    ],
    current: 0,

  },
  onLoad(e) {
    app.globalData.style = this.data.current + 1;
    this.onMove();
  },
  onBtnMusic(e) {
    var _this = this;
    var styles = _this.data.styles
    var id = e.target.id;
    styles.forEach((s) => {
      if (s.index == id) s.sel = true
      else s.sel = false
    })
    _this.setData({
      styles: styles
    })
    app.globalData.style = id
  },
  onBtnRight(e) {
    wx.navigateTo({
      url: `music?select=${app.globalData.select}&style=${app.globalData.style}&text=${app.globalData.text}`,
    })
  },
  bindchange(e) {
    var _this = this;
    console.log(e, e.detail.current)
    _this.setData({
      current: e.detail.current
    }, function () {
      app.globalData.style = _this.data.current
    })
  },
  bindtransition(e) {
    var per = 164 / e.detail.dx
    // console.log(e,per)
  },
  onNext(e) {
    ++this.data.current >= 4 && (this.data.current = 0)
    this.onMove();
  },
  onPrev(e) {
    --this.data.current < 0 && (this.data.current = 3)
    this.onMove();
  },
  onMove() {
    var _this = this,
      obj = _this.data.obj,
      styles = _this.data.styles,
      current = _this.data.current
    styles.forEach((s, i) => {
      i += current
      s.css = obj[i > 3 ? i - 4 : i]
    })
    app.globalData.style = current + 1
    _this.setData({
      styles: styles,
      current: current
    })
  },
  touchstart(e) {
    this.pageX = e.touches[0].pageX
  },
  touchend(e) {
    var x = e.changedTouches[0].pageX
    if (Math.abs(x - this.pageX) < 70) return false
    if (x > this.pageX) this.onNext()
    else this.onPrev()
  },
  onShareAppMessage: function () {
    return {
      title: 'qiaolezi',
      path: `/pages/index/index`,
      imageUrl: ""
    }
  }
})