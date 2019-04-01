const app = getApp();
Page({
  data: {
    styles: [
      { index: 1, text: "说唱" },
      { index: 2, text: "民谣" },
      { index: 3, text: "摇滚" },
      { index: 4, text: "中国风" },
    ],
    current:0,
  },
  onLoad(e){
    app.globalData.style =this.data.current+1;
  },
  onBtnMusic(e){
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
  bindchange(e){
    var _this = this;
    console.log(e,e.detail.current)
    _this.setData({
      current: e.detail.current
    },function(){
      app.globalData.style = _this.data.current
    })
  },
  bindtransition(e){
    var per = 164/e.detail.dx
    // console.log(e,per)
  }
})