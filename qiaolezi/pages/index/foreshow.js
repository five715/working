//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
   
  },
  onLoad:function(query) {
    const scene = decodeURIComponent(query.q)
    if (!scene || scene == 'undefined') return false
    var arr = scene.split("/");
    // wx.showToast({
    //   title: arr[arr.length - 1],
    //   icon: 'none',
    //   duration: 5000
    // })
  }
})
