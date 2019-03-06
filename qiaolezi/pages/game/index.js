const app = getApp();
Page({
  data:{
    select:-1,
    music:-1
  },
  onLoad(){
    
  },
  onBtnSelect(e){
    console.log(e.target.id)
    this.setData({
      select : e.target.id
    })
  },
  onBtnMusic(e) {
    console.log(e.target.id)
    var _this = this;
    var select = _this.data.select
    wx.navigateTo({
      url: `music?select=${select}&music=${e.target.id}`,
    })
    _this.setData({
      music: e.target.id
    })
  }
})