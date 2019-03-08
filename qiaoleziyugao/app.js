//app.js
var mta = require('/utils/mta_analysis.js')
App({
  onLaunch: function () {
    mta.App.init({
      "appID": "500671733",
      "eventID": "500671734",
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
  },
  globalData: {

  }
})