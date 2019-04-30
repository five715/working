//index.js
//获取应用实例
const app = getApp()
var mta = require("../../utils/mta_analysis.js")
Page({
  data: {
    code:0,
    isPopCdkey:0,
    isPopHint:0,
  },
  onClose(e){
    this.setData({
      isPopCdkey:false,
      isPopHint:false
    })
  },
  onLoad:function(query) {
    mta.Page.init()
    const scene = decodeURIComponent(query.q)
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/4";      //线下
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/XXXXXXXYYYYYY";    //脆筒
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/"    //棒签
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/6"
    if (!scene || scene == 'undefined') {
      //小程序码进入
      console.log("直接进入07")
      mta.Event.stat(`07`, {})
      return false
    }
    this.onIf(scene)
  },
  onIf(scene){
    var _this = this;
    var arr = scene.split("/");
    var code = arr[arr.length - 1]
    console.log(code)
    _this.setData({
      code: code
    })
    if (code.length == 13) {
      //带兑换码进入
      console.log("06")
      mta.Event.stat(`06`, {})
      _this.setData({
        isPopCdkey:true
      })
    }else if(code<=5 && code >0){
      //指定五个地址
      console.log(`0${code}`)
      mta.Event.stat(`0${code}`, {})
    }else if(code == 6){
      console.log(code,"08")
      mta.Event.stat(`08`, {})
    } else {
      //小程序码进入
      console.log("07")
      mta.Event.stat(`07`, {})
      //hint
      _this.setData({
        isPopHint:true
      })
    }
  },
  onBtn(e){
    this.onClose();
    this.onIf(e._relatedInfo.anchorTargetText);
  }
})
