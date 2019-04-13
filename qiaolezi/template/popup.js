
const app = getApp();
function onGuide(e) {
  this.setData({
    popup: 'guide'
  })
}
function onClose(e) {
  console.log(e)
  var _this = this;
  if (_this.data.popup == 'guide') {
    _this.setData({
      popup: "info"
    })
  } else {
    _this.setData({
      popup: false
    })
  }
}

function upfile(e) {
  var id = e.currentTarget.id
  var _this = this;
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      if(res.tempFiles[0].size/1000>5000){
        wx.showModal({
          title: '文件过大，不得超过5M',
          showCancel: false
        })
        return false
      }
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths[0]
      var fs = wx.getFileSystemManager();
      fs.readFile({
        filePath:tempFilePaths,
        encoding:"base64",
        success(res){
          // console.log(`data:image/png;base64,${res.data}`)
          var arr = _this.data.idCard
          arr[id] = `data:image/png;base64,${res.data}`
          _this.setData({
            idCard: arr
          })
        }
      })
    }
  })
}
function formSubmit(e) {
  var _this = this;
  var obj = e.detail.value;
  obj.award_id = _this.data.award_id
  obj.imageup = _this.data.idCard[0]
  obj.imagedown = _this.data.idCard[1]
  obj.form_id = e.detail.formId
  obj.type = _this.data.redType
  console.log(e, obj,app)
  app.api.saveUser(function(data){
    console.log(data)

    wx.sendBizRedPacket({
      timeStamp: data.timeStamp, // 支付签名时间戳，
      nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
      package: data.package, //扩展字段，由商户传入
      signType: 'MD5', // 签名方式，
      paySign: data.paySign, // 支付签名
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  }, obj)

  //关闭弹窗
  // _this.setData({
  //   isInfo: false
  // })
}

function formSubmitEntity(e) {
  var _this = this;
  var obj = e.detail.value;
  obj.award_id = _this.data.award_id
  obj.type = _this.data.redType
  if(obj.type == 1) {
    obj.imageup = _this.data.idCard[0]
    obj.imagedown = _this.data.idCard[1]
  }
  console.log(e, obj, app)

  app.api.saveinfo(function(data){
    console.log(data)

  },obj)
}



module.exports = {
  onGuide: onGuide,
  onClose: onClose,
  upfile: upfile,
  formSubmit: formSubmit,
  formSubmitEntity: formSubmitEntity
}