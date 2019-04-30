var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
const app = getApp();

Page({
  data:{
    head:"",
    nick:"",
    redeem: [], //已兑换棒签
    idCard: ["", ""],
    score: 200, //积分
    redcount:0,
    imagesUrl: app.globalData.imagesUrl,
    popup: false,
    redType: 1,
    per: {},
    scrollHeight: {},
    scrollT: {},
    pagePosition: 'fixed'
  },
  onBtnRule: nav.onBtnRule,
  onBtnHome: nav.onBtnHome,
  onGuide: popup.onGuide,
  onClose: popup.onClose,
  upfile: popup.upfile,
  formSubmit: popup.formSubmit,
  formSubmitEntity: popup.formSubmitEntity,
  bindscroll: popup.bindscroll,
  setPageHeight: popup.setPageHeight,
  onMove: popup.onMove,
  onLoad(e) {
    mta.Page.init()
    var _this = this;
    _this.setPageHeight();
    app.api.getUserInfo(function(data){
      console.log(data)
      // data.data.forEach((d,i)=>{
      //   console.log(d.award_name)
      //   // if(d.award_name.indexOf("oppo")!= -1 || )
      // })
      _this.setData({
        score: data.score,
        redeem:data.data,
        head:data.head,
        nick:data.nick,
        redcount:data.redcount
      })

      //补发红包
      app.api.resend(function (data) {
        console.log(data)
        if (data.code == 0) {
          // code = 0  判断 flag 如果flag = 1 需要补发 则小程序调用领取红包接口
          // code = 0  判断 flag 如果flag = 0  不做处理
          // code = -1 不做处理
          if (data.flag == 1) {
            // 小额红包
            wx.sendBizRedPacket({
              timeStamp: data.timeStamp + "", // 支付签名时间戳，
              nonceStr: data.nonceStr + "", // 支付签名随机串，不长于 32 位
              package: data.package, //扩展字段，由商户传入
              signType: 'MD5', // 签名方式，
              paySign: data.paySign, // 支付签名
              success: function (res) {
                console.log(res, '成功')
                app.api.updateLottery(function (resDate) {
                  console.log(resDate)
                }, data.award_id)
              }
            })
          }
        }
      })
      //补发红包end
    })
  },
  saveuser(e){
    var _this = this;
    var code = e.currentTarget.dataset.code
    var id = e.currentTarget.dataset.id
    console.log(e, code,id)
    _this.data.award_id = id
    switch (code) {
      case "20002":
        //52红包
        _this.setData({ popup: 'info', redType: 2})
        break;
      case "20003":
        //520红包
        _this.setData({ popup: 'info', redType: 3})
        break;
      case "2204":
        //oppo
        _this.setData({ popup: 'oppo', redType: 1})
        break;
      case "3204":
        //baby
        _this.setData({ popup: 'entity', redType: 2})
        break;
      case "3205":
        //王子异
        _this.setData({ popup: 'entity', redType: 3})
        break;
    }
  },
  onAiqiyi(e) {
    var _this = this;
    console.log(e)
    var fcode = e.currentTarget.dataset.fcode,
      fpwd = e.currentTarget.dataset.fpwd,
      name = e.currentTarget.dataset.name
    _this.setData({
      popup: "oneseifHint",
      hintText: [``, `${name}`, `账户名:${fcode}`, `密码:${fpwd}`]
    })
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.shareTitle[0],
      path: `/pages/index/foreshow`,
      imageUrl: app.globalData.shareImg[0]
    }
  }
})