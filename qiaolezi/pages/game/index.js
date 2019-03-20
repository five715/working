const app = getApp();
Page({
  data:{
    
  },
  onLoad(){
    
  },
  onBtnSelect(e){
    app.globalData.select = e.target.id
  },
  onBtnRight(e) {
    wx.navigateTo({
      url: `style`,
    })
  }
})