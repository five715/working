function onBtnRule(e){
  console.log(e,123)
}
function onBtnHome(e){
  wx.navigateTo({
    url: '/pages/index/index?isSkip=true',
  })
}

module.exports = {
  onBtnRule:onBtnRule,
  onBtnHome: onBtnHome
}