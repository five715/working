const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js'
const ctx = wx.createCanvasContext('picture')
var qrcode;
Page({
  data:{
    qrcode:"",
    pic:""
  },
  onLoad(e){
    var _this =this;
    console.log(e)
    wx.showShareMenu({
      withShareTicket: true
    })
    
    wx.showLoading({
      title: '图片生成中'
    })

    this.onCreateQrcode(e.fid)
  },
  onPicture(){
    var _this = this
    ctx.setFillStyle('#545')
    ctx.fillRect(0,0,750,750)
    ctx.draw(true)

    ctx.drawImage(_this.data.qrcode, 0, 0, 50, 50)
    ctx.draw(true)


    setTimeout(function () {
      wx.canvasToTempFilePath({
        width: 750,
        height: 350,
        canvasId: 'picture',
        success: (res) => {
          _this.setData({
            pic: res.tempFilePath
          }, wx.hideLoading)
        }
      })
    }, 500)
  },
  onCreateQrcode(fid){
    var _this = this;
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: `https:aa.q.com?fid=${fid}`
    })
    setTimeout(function(){
      wx.canvasToTempFilePath({
        canvasId: 'myQrcode',
        success: (res) => {
          _this.setData({
            qrcode: res.tempFilePath
          }, _this.onPicture)
        }
      })
    },100)
  },
  bindlongtap(e){
    console.log(e,e.target.dataset.src)
    var _this =this;
    var src = e.target.dataset.src
    wx.getSetting({
      success: function(res) {
        console.log(res)
        // if(res.authSetting["scope.writePhotosAlbum"]){
          wx.saveImageToPhotosAlbum({
            filePath: src,
            success:(res)=>{
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 1000
              })
            }
          })
        // }else{
        //   wx.showModal({
        //     title: '未打开保存权限',
        //     content: '是否前往打开',
        //     success(res) {
        //       if (res.confirm) {
        //         wx.openSetting({
        //           success:(res)=>{
        //             console.log("打开")
        //           }
        //         })
        //       } else if (res.cancel) {

        //       }
        //     }
        //   })
        // }
      }
    })
  }
})