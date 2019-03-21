const app = getApp();
Page({
  data:{
    selects: ["我不但可爱,我还可爱你了", "我咬你的时候,你也要对我笑", "我跟你除恋爱真美什么好谈的", "爱我是真心话,凶我是大冒险", "你的牙印,一定是爱我的小标记","不许动手,只许动心"]
  },
  onLoad(){
    
  },
  onBtnSelect(e) {
    app.globalData.select = e.target.id
    app.globalData.text = this.data.selects[e.target.id]
  },
  onBtnRight(e) {
    wx.navigateTo({
      url: `style`,
    })
  }
})