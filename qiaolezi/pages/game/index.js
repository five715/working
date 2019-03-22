const app = getApp();
Page({
  data: {
    selects: [
      { index: 1, text: "我不但可爱,我还可爱你了"},
      { index: 2, text: "我咬你的时候,你也要对我笑" },
      { index: 3, text: "我跟你除恋爱真美什么好谈的" },
      { index: 4, text: "爱我是真心话,凶我是大冒险" },
      { index: 5, text: "你的牙印,一定是爱我的小标记" },
      { index: 6, text: "不许动手,只许动心" }
    ]
  },
  onLoad() {

  },
  onBtnSelect(e) {
    var _this = this;
    var selects = _this.data.selects
    var id = e.target.id;
    selects.forEach((s) => {
      if (s.index == id) s.sel = true
      else s.sel = false
    })
    _this.setData({
      selects: selects
    })
    app.globalData.select = id
    app.globalData.text = selects[id].text
  },
  onBtnRight(e) {
    wx.navigateTo({
      url: `style`,
    })
  }
})