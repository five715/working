<template>
  <div class="btn-record">
    <img src="/static/ioc_record.png" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" class="record" alt="">
    <img v-show="isPop == 3" class="toast" src="/static/record_time.png" alt="">
    <img v-show="isPop == 1" class="toast" src="/static/record_mic.png" alt="">
    <img v-show="isPop == 2" class="toast" src="/static/record_close.png" alt="">
  </div>
</template>
<script>
const recorderManager = wx.getRecorderManager()
const InnerAudioContext = wx.createInnerAudioContext()
const options = {
  duration: 10000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}
export default {
  data () {
    return {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      dis: 100,
      isPop: 0,
      isSend: true,
      isDown: true
    }
  },
  onUnload () {
    console.log(this.isPop)
  },
  methods: {
    onTouchStart (e) {
      var that = this
      that.isDown = true
      recorderManager.onStop((res) => {
        console.log(that, that.isSend)
        if (that.isSend) {
          if (res.duration < 3000) {
            that.isPop = 3
            console.log('时间过短')
            setTimeout(function () {
              that.isPop = 0
            }, 2000)
          } else {
            console.log('发送成功,播放', res)
            that.isPop = 0
            InnerAudioContext.src = res.tempFilePath
            InnerAudioContext.play()
          }
        } else {
          that.isPop = 0
          console.log('取消发送')
        }
      })
      recorderManager.onStart(() => {
        that.isPop = 1
      })
      that.startX = e.pageX
      that.startY = e.pageY
      wx.authorize({
        scope: 'scope.record',
        success () {
          if (that.isDown) {
            console.log('录音授权成功')
            recorderManager.start(options)// 使用新版录音接口，可以获取录音文件
            that.isPop = 1
            that.isSend = true
          } else {
            that.isPop = 3
            console.log('时间过短')
            setTimeout(function () {
              that.isPop = 0
            }, 2000)
          }
        },
        fail (res) {
          wx.showModal({
            title: '提示',
            content: '您未授权录音，功能将无法使用',
            showCancel: true,
            confirmText: '授权',
            confirmColor: '#52a2d8',
            success: function (res) {
              if (res.confirm) {
                // 确认则打开设置页面（重点）
                wx.openSetting({
                  success: (res) => {
                    console.log(res.authSetting)
                    if (!res.authSetting['scope.record']) {
                      // 未设置录音授权
                      wx.showModal({
                        title: '提示',
                        content: '您未授权录音，功能将无法使用',
                        showCancel: false,
                        success: function (res) {}
                      })
                    } else {
                      // 第二次才成功授权
                      console.log('设置录音授权成功')
                      recorderManager.start(options)
                    }
                  },
                  fail: function () {
                    console.log('授权设置录音失败')
                  }
                })
              } else if (res.cancel) {
                console.log('cancel')
              }
            }
          })
        }
      })
    },
    onTouchMove (e) {
      var that = this
      that.x = e.pageX
      that.y = e.pageY
      var dis = that.startY - that.y
      if (dis > that.dis) {
        that.isPop = 2
        that.isSend = false
      } else {
        that.isPop = 1
        that.isSend = true
      }
    },
    onTouchEnd (e) {
      this.isDown = false
      recorderManager.stop()
    }
  }
}
</script>

<style>
.btn-record .record{width: 230rpx; height: 90rpx;}
.btn-record .toast{width: 300rpx; height: 300rpx;position: fixed;top: 388rpx;
/* left: 165rpx; */
margin-left: -265rpx;
}
</style>
