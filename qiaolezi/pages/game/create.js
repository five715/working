const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js'
const ctx = wx.createCanvasContext('picture')
var qrcode;
Page({
  data:{
    qrcode:"",
    pic:"",
    locolurl:"",
    nickName:""
  },
  onLoad(e){
    var _this =this;
    console.log(e)
    _this.data.fid = e.fid
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow() {
    var _this = this;
    if (_this.data.pic) return
    console.log(_this.data.fid)
    wx.getUserInfo({
      success(user){
        console.log(user)
        wx.showLoading({
          title: '图片生成中'
        })
        wx.downloadFile({
          url: user.userInfo.avatarUrl,
          success: res => {
            console.log(res)
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              _this.setData({
                locolurl: res.tempFilePath,//将下载下来的地址给data中的变量变量
                nickName:user.userInfo.nickName
              });
              _this.onCreateQrcode(_this.data.fid)
            }
          }, fail: res => {
            console.log(res);
          }
        })
      },
      fail(res){
        wx.showModal({
          title: '未打开',
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

    ctx.setFillStyle('#fff')
    ctx.setFontSize(30)
    ctx.fillText(_this.data.nickName, 60,30)
    ctx.draw(true)


    setTimeout(function () {
      wx.canvasToTempFilePath({
        width: 750,
        height: 750,
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
          console.log(res,12321)
          _this.setData({
            qrcode: res.tempFilePath
          }, _this.onPicture)
        },fail(res){
          _this.onCreateQrcode(_this.data.fid)
        }
      })
    },1000)
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