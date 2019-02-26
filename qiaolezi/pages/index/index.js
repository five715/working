
var mta = require('../../utils/mta_analysis.js')
Page({
  data: {
    isInput: false,  //是否输入状态
    isEnd: false,  //活动是否结束
    red: 0         //0代表关闭弹窗 || 0.33, 0.52, 1.17, 1.25, 3.33, 99显示弹窗
  },
  onPlay() {
    console.log("开始")
  },
  onBtnInfo() {
    var _this = this;
    var red = 99
    _this.setData({
      red: red
    })
  },
  onBtnRule() {
    console.log("活动规则")
  },
  onClose() {
    this.setData({
      red: 0
    })
  },
  // 获取焦点
  bindFocus(e) {
    this.setData({
      isInput: true
    })
  },
  // 失去焦点
  bindBlur(e) {
    this.setData({
      isInput: false
    })
  },
  onLoad(e) {
    // mta.Page.init();
    // mta.Event.stat("01",{})
  }
})