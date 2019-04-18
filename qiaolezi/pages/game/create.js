const app = getApp();
import drawQrcode from '../../utils/weapp.qrcode.js'
const ctx = wx.createCanvasContext('picture')
var qrcode;
Page({
  data:{
    qrcode:"",
    pic:"",
    locolurl:"",
    nickName: "",
    imagesUrl: app.globalData.imagesUrl,
    backUrl:"https://qiaolezi.act.qq.com/e/c/backcode/",
    texts:[
      '为你而唱（&）炫彩情歌，我的心在左边，你在我的心里边',
      '为你而唱（&）炫彩情歌，我不是唯物主义者，是唯你主义者',
      '为你而唱（&）炫彩情歌，小小爱意，不成敬意',
      '您好，这里有一箱情愿请查收--为你定制的（&）炫彩情歌～',
      '明枪易躲 暗恋难防，我的（&）炫彩情歌, 猝不及防。',
     ' 为你而唱(&)炫彩情歌，喜你成疾，药石无医'
    ]
  },
  onLoad(e) {
    mta.Page.init()
    var _this =this;
    console.log(e)
    _this.data.fid = e.fid
    _this.selects = e.selects
    _this.style = e.style
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
        // wx.downloadFile({
        //   url: user.userInfo.avatarUrl,
        //   success: res => {
        //     console.log(res)
        //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        //     if (res.statusCode === 200) {
              _this.setData({
        //         locolurl: res.tempFilePath,//将下载下来的地址给data中的变量变量
                nickName:user.userInfo.nickName
              });
              _this.onCreateQrcode(_this.data.fid)
    //         }
    //       }, fail: res => {
    //         console.log(res);
    //       }
    //     })
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
    var imagesUrl = _this.data.imagesUrl
    var simona = _this.data.texts[parseInt(Math.random() * _this.data.texts.length)]
    var interval = 38
    ctx.setFillStyle('#545')
    ctx.fillRect(0,0,750,750)
    ctx.draw(true)
    
    ctx.drawImage(`/images/create_bg.jpg`, 0, 0, 750, 1351)
    ctx.drawImage(`/images/logo.png`, 31, 45, 129, 83)
    ctx.drawImage(`/images/create_slogan.png`, 82, 64, 598, 488)
    ctx.drawImage(`/images/create_iocs.png`, 177, 486, 408, 156)
    ctx.drawImage(`/images/create_text_bg.png`, 41, 676, 668, 135)
    ctx.drawImage(`/images/create_qrcode_bg.png`, 494, 910, 172, 188)
    ctx.drawImage(`/images/create_style.png`, 58, 887, 77, 86)
    // ctx.drawImage(`/images/create_style_hint.png`, 84, 981+40, 178, 32)
    ctx.drawImage(`/images/create_text_${_this.selects}.png`, 186, 731, 377, 31)

    var s = ['说唱', '民谣', '摇滚', '中国风']
    ctx.setFontSize(30)
    ctx.setStrokeStyle("#ff60d2")
    ctx.setLineWidth(0.8)
    ctx.setFillStyle("#ffffff")
    var text = simona.replace("&", s[_this.style-1])
    console.log(text,text.length)
    if(text.length)
    var arr = []
    var i = 0;
    var sn = 14;
    while (i < text.length) {
      arr.push(text.substr(i, sn));
      i += sn;
    }

    arr.forEach((a,i)=>{
      ctx.fillText(a, 84, 1008 + interval * i)
      ctx.strokeText(a, 84, 1008 + interval * i)
    })

    ctx.fillText('邀你扫码倾听', 84, 1008 + interval * (arr.length + 1))
    ctx.strokeText('邀你扫码倾听', 84, 1008 + interval * (arr.length + 1))


    var nick = _this.data.nickName;
    if(nick.length > 8) {
      nick = nick.substr(0,8)+"..."
    }
    
    ctx.setFontSize(40)
    ctx.fillText(nick, 136, 968)
    ctx.strokeText(nick, 136, 968)

    ctx.rect(519, 919,105,104)
    ctx.setFillStyle('#ffffff')
    ctx.fill()
    ctx.drawImage(_this.data.qrcode, 524, 923, 96, 96)
    ctx.draw(true)

    ctx.draw(true)

    setTimeout(function () {
      wx.canvasToTempFilePath({
        width: 750,
        height: 1351,
        canvasId: 'picture',
        success: (res) => {
          _this.setData({
            pic: res.tempFilePath
          }, wx.hideLoading)
        }
      })
    }, 1000)
  },
  onCreateQrcode(fid) {
    var _this = this;
    // app.api.getQrcode(function (data) {
    //   const ctx = wx.createCanvasContext('myQrcode'), //canvas
    //     fsm = wx.getFileSystemManager(),  //文件管理器
    //     FILE_BASE_NAME = 'tmp_base64src', //文件名
    //     format = 'png', //文件后缀
    //     base64Str = (data), //base64字符串
    //     buffer = wx.base64ToArrayBuffer(base64Str), //base 转二进制
    //     filePath = `${wx.env.USER_DATA_PATH}/www.${format}`; //文件名

    //   fsm.writeFile({ //写文件
    //     filePath,
    //     data: buffer,
    //     encoding: 'binary',
    //     success(res) {
    //       wx.getImageInfo({ //读取图片
    //         src: filePath,
    //         success: function (res) {
    //           console.log({
    //             res
    //           })
    //           _this.setData({
    //             qrcode: res.path,
    //           }, _this.onPicture)
    //         },
    //         error(res) {
    //           console.log({
    //             res
    //           })
    //         }
    //       })
    //     }
    //   })
    // }, fid)
    var backUrl = `${_this.data.backUrl}?${fid}`
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      foreground:"#592111",
      // image: { imageResource: _this.data.locolurl, dx: 75, dy: 75, dWidth: 50, dHeight: 50 },
      text: backUrl
    })
    _this.setData({
      backUrl: backUrl
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
      if(res.authSetting["scope.writePhotosAlbum"] == false){
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
  },
  onBtnBack(){
    var _this = this;
    console.log(`/pages/back/index?url=${_this.data.backUrl.split("?")[1]}`)
    wx.navigateTo({
      url: `/pages/back/index?url=${_this.data.backUrl.split("?")[1]}`
    })
  },
  onShareAppMessage: function () {
    var _this = this;
    return {
      title: app.globalData.shareTitle[1],
      path: `/pages/back/index?fid=${_this.data.fid}`,
      imageUrl: app.globalData.shareImg[1]
    }
  }
})