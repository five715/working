
var mta = require('../../utils/mta_analysis.js')
Page({
  data: {
    isInput: false,  //是否输入状态
    isEnd: false,  //活动是否结束
    red: 0,         //0代表关闭弹窗 || 0.33, 0.52, 1.17, 1.25, 3.33, 99显示弹窗
    isInfo:false,
    isGuide : false,
    idCard : ["",""]
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
      red: 0,
      isGuide:false
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
  },
  onRedBtn(e){
    this.setData({
      isInfo:true,
      red:0
    })
  },
  formSubmit(e){
    var _this =this;
    var obj = e.detail.value;
    obj.idCard = _this.data.idCard
    console.log(obj)

    //关闭弹窗
    _this.setData({
      isInfo : false
    })
  },
  upfile: function (e) {
    var id = e.currentTarget.id
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        var arr = _this.data.idCard
        console.log(res, tempFilePaths)
        arr[id] = tempFilePaths
        _this.setData({
          idCard : arr
        })
      }
    })
  },
  onGuide(){
    console.log(1231)
    this.setData({
      isGuide:true
    })
  }
})