const app = getApp();
Page({
  data: {
    
  },
  onLoad(e){

  },
  onBtnMusic(e){
    console.log(e)
    app.globalData.style = e.target.id
  },
  onBtnRight(e) {
    wx.navigateTo({
      url: `music?select=${app.globalData.select}&style=${app.globalData.style}`,
    })
  }
})