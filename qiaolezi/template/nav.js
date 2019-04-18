function onBtnRule(e){
  this.setData({
    popup:'rule',
    scrollT: {ruel:0 }
  })
}
function onBtnHome(e){
  wx.navigateTo({
    url: '/pages/index/foreshow?isSkip=true',
  })
}

module.exports = {
  onBtnRule:onBtnRule,
  onBtnHome: onBtnHome
}