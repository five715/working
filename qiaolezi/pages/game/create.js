const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js'
var qrcode;
Page({
  data:{
    qrcode:""
  },
  onLoad(e){
    console.log(e)
    this.onCreateQrcode(e.fid)
  },
  onCreateQrcode(fid){
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: `https:aa.q.com?fid=${fid}`
    })
  },
  getBase64Data (){
    var _this = this
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success: (res) => {
        console.log(res.tempFilePath)
        _this.setData({
          qrcode: res.tempFilePath
        })
      }
    })
  },
  bindlongtap(e){
    console.log(e)
    var _this =this;
    wx.getSetting({
      success: function(res) {
        console.log(res)
        if(res.authSetting["scope.writePhotosAlbum"]){
          wx.saveImageToPhotosAlbum({
            filePath: _this.data.qrcode,
            success:(res)=>{
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }else{
          wx.showModal({
            title: '未打开保存权限',
            content: '是否前往打开',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success:(res)=>{
                    console.log("打开")
                  }
                })
              } else if (res.cancel) {

              }
            }
          })
        }
      }
    })
  }
})