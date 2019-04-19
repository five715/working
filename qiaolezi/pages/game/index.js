const app = getApp();
var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
Page({
  data: {
    selects: [
      { index: 1, text: "我不但可爱,我还可爱你了", mta: 26 },
      { index: 2, text: "我咬你的时候,你也要对我笑", mta: 27 },
      { index: 3, text: "我跟你除恋爱真没什么好谈的", mta: 28 },
      { index: 4, text: "爱我是真心话,凶我是大冒险", mta: 29 },
      { index: 5, text: "你的牙印,一定是爱我的小标记", mta: 30 },
      { index: 6, text: "不许动手,只许动心", mta: 31 }
    ],
    imagesUrl: app.globalData.imagesUrl,
    popup:false,
    hintText:""
  },
  onClose:popup.onClose,
  onLoad(e) {
    mta.Page.init()
    console.log(e)
  },
  onBtnSelect(e) {
    mta.Event.stat(`10`, {})
    var _this = this;
    var selects = _this.data.selects
    var id = e.currentTarget.id;
    console.log(selects,id,e)
    selects.forEach((s) => {
      if (s.index == id) s.sel = true
      else s.sel = false
    })
    _this.setData({
      selects: selects
    })
    app.globalData.select = id
    app.globalData.text = selects[id-1].text
    console.log(selects[id-1].text,selects[id-1],id)
  },
  onBtnRight(e) {
    var _this = this;
    var _is = false
    this.data.selects.forEach((s)=>{
      if(s.sel) _is = true
    })
    if(_is){
      _this.data.selects.forEach((select)=>{
        if(select.index == app.globalData.select){
          console.log(select.mta,select.text)
          mta.Event.stat(select.mta, {})
        }
      })
      wx.navigateTo({
        url: `style?select=${app.globalData.select}`,
      })
      return false
    }else{
      this.setData({
        popup:"hint",
        hintText: ['请选择你喜欢的棒签']
      })
    }

    
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})