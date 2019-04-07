function onBtnRule(e){
  wx.showModal({
    title: '活动规则',
    showCancel: false,
  })
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