function onBtnRule(e){
  this.setData({
    popup:'rule'
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