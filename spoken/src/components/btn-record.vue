<template>
  <div class="btn-record">
    <img src="/static/ioc_record.png" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" class="record" alt="">
    <img v-show="isPop == 1" class="toast" src="/static/record_mic.png" alt="">
    <img v-show="isPop == 2" class="toast" src="/static/record_close.png" alt="">
    <img v-show="isPop == 3" class="toast" src="/static/record_time.png" alt="">
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
      isPop: 0
    }
  },
  created () {
    var that = this
    recorderManager.onStop((res) => {
      if (res.duration < 3000) {
        console.log(that)
        that.isPop = 3
      } else {
        that.isPop = 0
        InnerAudioContext.src = res.tempFilePath
        InnerAudioContext.play()
      }
    })
    recorderManager.onStart(() => {
      that.isPop = 1
    })
  },
  methods: {
    onTouchStart (e) {
      var that = this
      this.startX = e.pageX
      this.startY = e.pageY
      wx.authorize({
        scope: 'scope.record',
        success () {
          console.log('录音授权成功')
          recorderManager.start(options)// 使用新版录音接口，可以获取录音文件
          that.isPop = 1
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
      this.x = e.pageX
      this.y = e.pageY
      var dis = this.startY - this.y
      if (dis > this.dis) {
        this.isPop = 2
      } else {
        this.isPop = 1
      }
    },
    onTouchEnd (e) {
      var that = this
      setTimeout(function () {
        that.isPop = 0
        recorderManager.stop()
      }, 200)
      this.isPop = 0
      recorderManager.stop()
      var dis = this.startY - this.y
      if (dis > this.dis) {
        console.log('取消发送')
      } else {
        console.log('发送成功')
      }
    }
  }
}
</script>

<style>
.btn-record .record{width: 230rpx; height: 90rpx;}
.btn-record .toast{width: 300rpx; height: 300rpx;position: fixed;top: 388rpx;left: 165rpx;}
</style>
