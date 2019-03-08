//index.js
//获取应用实例
const app = getApp()
var mta = require("../../utils/mta_analysis.js")
Page({
  data: {
    code:8888888888888,
    isPopCdkey:0,
    isPopHint:0
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
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/5";
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/XXXXXXXYYYYYY";
    // const scene = "https://qiaolezi.act.qq.com/e/c/code/"
    if (!scene || scene == 'undefined') return false
    this.onIf(scene)
  },
  onIf(scene){
    var _this = this;
    var arr = scene.split("/");
    var code = arr[arr.length - 1]
    console.log(code)
    if(code.length == 13){
      _this.setData({
        code:code,
        isPopCdkey:true
      })
    }else if(code<=5 && code >0){
      //指定五个地址
      console.log(`0${code}`)
      mta.Event.stat(`0${code}`,{})
    }else{
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
