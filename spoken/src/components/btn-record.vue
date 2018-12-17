<template>
  <div class="btn-record">
    <img v-if="type == 1" src="/static/ioc_record.png" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" class="record" alt="">
    <img v-else-if="type == 2" src="/static/ioc_record2.png" @click="onBindClick" class="record2" alt="">
  </div>
</template>
<script>
const recorderManager = wx.getRecorderManager()
const options = {
  duration: 10000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}
export default {
  props: {
    initType: {
      type: Number,
      default: 1
    },
    initDuration: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      dis: 100,
      isPop: 0,
      isSend: true,
      isDown: true,
      isExecute: true,
      type: this.initType,
      duration: this.initDuration * 1000,
      nowDuration: 0,
      interval: 10
    }
  },
  onUnload () {
    console.log(this.isPop)
  },
  methods: {
    notiftNum (src, duration, bol) {
      this.$emit('setSrc', {
        'src': src,
        'duration': duration,
        'isPlay': bol
      })
    },
    onBindClick () {
      if (!this.isDown) return false
      var that = this
      that.$emit('recordStart', {})
      that.nowDuration = 0
      if (that.isExecute) {
        that.isExecute = false
        recorderManager.onStart(() => {
          that.isDown = false
          console.log('录音开始')
          var timer = setInterval(() => {
            that.nowDuration += that.interval
            that.$emit('setRate', {nowDuration: that.nowDuration})
            if (that.nowDuration >= that.duration) {
              recorderManager.stop()
              clearInterval(timer)
            }
          }, that.interval)
        })
        recorderManager.onStop((res) => {
          console.log(res)
          that.isDown = true
          console.log('录音结束')
          that.notiftNum(res.tempFilePath, res.duration, true)
        })
      }

      // var timer = setInterval(() => {
      //   that.nowDuration += that.interval
      //   that.$emit('setRate', {nowDuration: that.nowDuration})
      //   if (that.nowDuration >= that.duration) {
      //     recorderManager.stop()
      //     clearInterval(timer)
      //     that.notiftNum('http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_3.mp3', 5000, true)
      //   }
      // }, that.interval)

      that.onAuthorize(function () {
        recorderManager.start(options)
      })
    },
    onAuthorize (callback) {
      wx.authorize({
        scope: 'scope.record',
        success () {
          callback()
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
    onTouchStart (e) {
      var that = e.this || this
      console.log(that.Global, e)
      that.$emit('clickStart', {})
      that.isDown = true
      if (that.isExecute) {
        that.isExecute = false
        recorderManager.onStop((res) => {
          console.log(that, that.isSend)
          if (that.isSend) {
            if (res.duration < 3000) {
              that.Global.isPop(3)
              that.$emit('breakOff', {})
              console.log('时间过短')
              setTimeout(function () {
                that.Global.isPop(0)
              }, 2000)
            } else {
              console.log('发送成功,播放', res)
              that.Global.isPop(0)
              that.notiftNum(res.tempFilePath, res.duration)
              // InnerAudioContext.src = res.tempFilePath
              // InnerAudioContext.play()
            }
          } else {
            that.Global.isPop(0)
            console.log('取消发送')
            that.$emit('breakOff', {})
          }
        })
        recorderManager.onStart(() => {
          that.Global.isPop(1)
          that.$emit('recordStart', {})
        })
      }
      that.startX = e.pageX
      that.startY = e.pageY
      that.onAuthorize(function () {
        if (that.isDown) {
          console.log('录音授权成功')
          recorderManager.start(options)// 使用新版录音接口，可以获取录音文件
          that.Global.isPop(1)
          that.isSend = true
        } else {
          that.Global.isPop(3)
          that.$emit('breakOff', {})
          console.log('时间过短')
          setTimeout(function () {
            that.Global.isPop(0)
          }, 2000)
        }
      })
    },
    onTouchMove (e) {
      var that = e.this || this
      that.x = e.pageX
      that.y = e.pageY
      var dis = that.startY - that.y
      if (dis > that.dis) {
        that.Global.isPop(2)
        that.isSend = false
      } else {
        that.Global.isPop(1)
        that.isSend = true
      }
    },
    onTouchEnd (e) {
      var that = e.this || this
      that.isDown = false
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.record'] !== undefined) {
            recorderManager.stop()
          }
        }
      })
    }
  }
}
</script>

<style>
.btn-record .record{width: 230rpx; height: 90rpx;}
.btn-record .record2{width: 80rpx; height: 80rpx;}
</style>
