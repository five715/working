const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js'
const ctx = wx.createCanvasContext('picture')
var qrcode;
Page({
  data:{
    qrcode:"",
    pic:"",
    locolurl:"",
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
    var _this =this

    wx.downloadFile({
      url: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKl06gDibQ7aOxHd47M5C35QS9YK5TDK5L5LdRQZgqACTJIrugp7PcGiazrT0urPkcK80CGJCw1r7SA/132",
      success: res => {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          this.setData({
            locolurl: res.tempFilePath//将下载下来的地址给data中的变量变量
          });
          _this.onCreateQrcode(e.fid)
        }
      }, fail: res => {
        console.log(res);
      }
    })
  },
  onPicture(){
    var _this = this
    ctx.setFillStyle('#545')
    ctx.fillRect(0,0,750,750)
    ctx.draw(true)

    ctx.drawImage(_this.data.qrcode, 0, 0, 50, 50)
    ctx.draw(true)

    ctx.drawImage(_this.data.locolurl, 50, 50, 50, 50)
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