//app.js
var mta = require('/utils/mta_analysis.js')
App({
  onLaunch: function () {
    mta.App.init({
      "appID": "wxa206b57027b01b51",
      "eventID": "",
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
  },
  onload(){
    
  },
  globalData: {

  }
})