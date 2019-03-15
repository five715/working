function onBtnRule(e){
  console.log(e,123)
}
function onBtnHome(e){
  wx.navigateBack({
    delta: 10
  })
}

module.exports = {
  onBtnRule:onBtnRule,
  onBtnHome: onBtnHome
}