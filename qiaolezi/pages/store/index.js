var nav = require("../../template/nav.js");
var popup = require("../../template/popup.js");
var mta = require("../../utils/mta_analysis.js")
const app = getApp();
Page({
  data:{
    isPop:false,
    isLuck:true,
    luck:"",
    userInfo:"",
    redeems: [
      { src: 1, score: 300, surplus: 0, type: 3, name: "爱奇艺季卡" ,code:"aqiyiji"},
      { src: 2, score: 100, surplus: 0, type: 2, name: "爱奇艺月卡",code:"aqiyimonth" },
      { src: 3, score: 50, surplus: 0, type: 1, name: "爱奇艺7天卡", code: "aqiyi" },
      { src: 4, score: 20, surplus: 1, isUnlock: false },
      // { src: 5, score: 0, surplus: 0 },
      { src: 6, score: 500, surplus: 0, type: 4, name: "Angelababy",code:"babyphoto" }
      // { src: 6, score: 800, surplus: 0, type: 5, name: "王子异签名照",code:"wzyphoto" }
    ],
    prizes: [
      { prize: "vip", state: "yes", ret: 3 },
      { prize: "red_52", state: "no", ret: 5 },
      { prize: "vip_30", state: "no", ret: 2 },
      { prize: "red_520", state: "no", ret: 6 },
      { prize: "no", state: "no", ret: 0 },
      { prize: "vip_7", state: "no", ret: 1 },
      { prize: "no", state: "no", ret: 0 },
      { prize: "oppo", state: "no", ret: 4 }
    ],
    scrollHeight:{},
    per: {},
    imagesUrl: app.globalData.imagesUrl,
    popup: false,
    redType: 0,
    hintText: [],
    idCard: ["", ""],
    scrollT: {},
    pagePosition: 'fixed',
    vid:""
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
  // 兑换包
  onReddem(e){
    var _this =this;
    var objs = _this.data.redeems
    _this.id = e.currentTarget.dataset.id
    console.log(objs, _this.id, objs[_this.id].surplus)
    if (objs[_this.id].surplus <= 0) {
      _this.setData({
        popup: 'hint',
        hintText: ["哎呀，你来晚啦，本周奖品已兑换完了，下周早点来呀~"]
      })
      return false
    }
    if(objs[_this.id].src == 4){
      app.api.getVideo(function (data) {
        console.log(data)
        if (data.code == 0) {
          if (!data.vid) {
            //前端提示弹层
            _this.setData({
              popup: 'hint',
              hintText: ['恭喜丸子女孩们，视频解锁成功！巧乐兹正在马不停蹄更新中，请明日来观看炫酷王子异！'],
            })
          } else {
            // 播放视频
            _this.setData({
              vid: data.vid,
              popup:"video"
            })
          }
          // var objs = _this.data.redeems
          // objs.forEach((o) => {
          //   if (o.src == 4) {
          //     o.isUnlock = data.code == 0 ? true : false
          //     o.surplus = data.code == 0 ? 0 : 1
          //   }
          // })
          // _this.setData({
          //   redeems: objs
          // })
        }else{
          _this.setData({
            popup: 'hintBtn',
            hintText: ['解锁视频需要消耗50心跳，', '是否确定消耗？']
          })
        }
      })
    }else if (objs[_this.id].src == 6) {
      _this.setData({
        popup: 'hintBtn',
        hintText: [`巧乐兹代言人${objs[_this.id].name}签名`, `照，多款签名照片随机发放！`, `确定要消耗${objs[_this.id].score}心跳兑换吗？`]
      })
    }else{
      _this.setData({
        popup:'hintBtn',
        hintText: [`确定要消耗${objs[_this.id].score}心跳兑换吗？`]
      })
    }
  },
  onBtnHintYes(e) {
    var _this = this;
    if(_this.isReddem) return
    _this.isReddem = true
    var objs = _this.data.redeems
    var userInfo = _this.data.userInfo
    var id = _this.id;
    console.log(objs)
    var type = objs[id].type
    if (objs[_this.id].src == 4){
      app.api.unlockVideo(function (data) {
        _this.isReddem = false
        console.log(data)
        if(data.code == 0){
          objs[_this.id].isUnlock = true
          _this.setData({
            popup: 'hint',
            hintText: ['积分已扣除，请等待视频解锁'],
            redeems: objs
          })
        } else {
          var arr = []
          arr.push(data.message)
          _this.setData({
            popup: 'hint',
            hintText: arr
          })
        }
      })
      return false
    }
    app.api.exscore(function(data){
      _this.isReddem = false
      console.log(data)
      _this.data.award_id = data.award_id
      if(data.code==0){
        if (data.ret > 0 && data.ret < 4) {
          var name = data.ret == 1 ? "爱奇艺7天" : (data.ret == 2 ? "爱奇艺月卡" : (data.ret == 3 && "爱奇艺季卡"))
          _this.setData({
            popup: 'LuckHint',
            hintText: [`恭喜你，获得${name}奖品`, `卡号:${data.fcode}`, `密码:${data.pwd}`]
          })
        } else if (data.ret==4){
          _this.setData({
            popup: 'entity',
            redType:2
          })
        } else if (data.ret == 5){
          _this.setData({
            popup: 'entity',
            redType: 3
          })
        }else{
          _this.setData({
            popup:'hint',
            hintText: objs[id].src == 4? ['视频解锁成功', '请于次日再来观看'] : ['恭喜你兑换成功啦~', '前往活动规则了解更多','奖品使用信息']
          })
        }

        objs[id].surplus--
        userInfo.score -= objs[id].score
        _this.setData({
          redeems: objs,
          userInfo:userInfo
        })
      }else if(data.code == -1){
        var arr = []
        arr.push(data.message)
        _this.setData({
          popup: 'hint',
          hintText: arr
        })
      }
    }, _this.data.userInfo.score, type)
  },
  // 启动抽奖
  onBtnLuck(e) {
    var _this = this;
    console.log(23, '点击抽取按钮')
    mta.Event.stat(`23`, {})
    if (!_this.data.userInfo.score || _this.data.userInfo.score < 10) {
      _this.setData({
        popup: 'notEnough'
      })
    }else{
      this.setData({
        popup: 'LuckHintBtn',
        hintText: ['确定要用心跳参与抽奖吗？']
      })
    }
  },
  onBtnLuckHintYes() {
    console.log(32, '是,开始抽取')
    mta.Event.stat(`32`, {})
    var _this = this;
    _this.setData({
      popup: false
    }, function () {
      var userInfo = _this.data.userInfo
      app.api.lottery(function (data) {
        userInfo.score -= 10
        console.log(data,_this.data.prizes)
        data.ret = data.award_code
        // var ret = data
        var rets = []
        _this.data.prizes.forEach((p,i)=>{
            if(p.ret == data.ret) rets.push(i+1)
        })
        var ret = rets.length > 1 ? rets[parseInt(Math.random() * rets.length)] : rets[0]
        console.log(rets,ret)
        if (data.code == 0) {
          _this.data.award_id = data.award_id
          _this.funcLuck(function () {
            if(data.ret == 0){
              _this.setData({
                popup: 'LuckHint',
                hintText: [`谢谢参与~`]
              })
            }else{
              if(data.ret>0 && data.ret <4){
                _this.setData({
                  popup: 'LuckHint',
                  hintText: [`恭喜你，获得${data.award_name}奖品`, `卡号:${data.fcode}`, `密码:${data.pwd}`]
                })
              }else if(data.ret == 4){
                _this.setData({
                  popup: 'oppo',
                  redType:1
                })
              }else if(data.ret ==5 || data.ret == 6){
                _this.setData({
                  popup:'info',
                  redType: data.ret == 5 ? 2 : (data.ret == 6 && 3)
                })
              }else{
                _this.setData({
                  popup: 'LuckHint',
                  hintText: [`恭喜你，获得${data.award_name}奖品`]
                })
              }
            }
            _this.setData({
              luck: data,
              userInfo: userInfo
            })
          }, ret)
        }else{
          _this.setData({
            popup: 'notEnough'
          })
        }
      }, _this.data.userInfo.score)
    })
  },
  funcLuck(callback, id) {
    var _this = this
    var isIn = false,   //是开始减速
        speed = 80,     //起始速度
        rise = 50,      //速度增长单位
        i = 1,          //起始位置
        encircle = 5,   //最少圈数
        buffer = 5,     //缓冲数量
        prizes = _this.data.prizes
    console.log(id)
    // if(id == 1 )
    function count() {
      ++i > prizes.length && (i = 1, encircle--)

      for (var p = 0; p < prizes.length; p++) {
        prizes[p].state = "no"
        prizes[i - 1].state = "yes"
      }
      _this.setData({
        prizes: prizes
      })

      if (encircle <= 0 && i == (id < buffer ? prizes.length + (id - buffer) : id - buffer)) isIn = true
      if (encircle < 0) isIn = true

      if (isIn) {
        speed += rise
        if (i == id && speed > rise * 3) {
          setTimeout(callback, 500)
          return false
        }
      }
      setTimeout(count, speed)
    }
    count()
  },
  onLoad() {
    mta.Page.init()
    var _this =this;
    _this.setPageHeight();
    _this.onUserInfo();
  },
  onUserInfo(){
    var _this =this
    var redeems = _this.data.redeems
    app.api.getUserInfo(function(data){
      console.log(data)
      for(var count in data.lotteryCount){
        redeems.forEach((r,i)=>{
          if(r.code == count){
            redeems[i].surplus = data.lotteryCount[count]
          }
        })
      }
      _this.setData({
        userInfo:data,
        redeems:redeems
      })
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