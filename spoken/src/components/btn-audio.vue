<template>
    <div class="btn-audio">
        <img v-if="type==1" src="/static/ioc_audition.png" class="audition" alt="" @click="onAudition">
        <img v-else-if="type ==2" src="/static/ioc_accept.png" class="accept" alt="" @click="onAudition">
        <img v-else-if="type ==3" :src="'/static/ioc_' + (pause==''?'original':pause) + '.png'" class="original" alt="" @click="onAuditionTypeThree">
    </div>
</template>

<script>
const InnerAudioContext = wx.createInnerAudioContext()
export default {
  props: {
    initType: {
      type: String,
      default: 1
    },
    initSrc: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      type: this.initType,
      src: this.initSrc,
      pause: ''
    }
  },
  created () {
    InnerAudioContext.onPause((res) => {
      this.pause = ''
      wx.hideToast()
    })
  },
  methods: {
    onAudition (e) {
      if (this.src) {
        InnerAudioContext.src = this.src
        InnerAudioContext.play()
      }
      this.notiftNum()
    },
    onAuditionTypeThree (e) {
      var that = this
      if (that.pause === '') InnerAudioContext.pause()
      console.log(that.src, InnerAudioContext.paused)
      setTimeout(function () {
        if (InnerAudioContext.paused && that.pause === '') {
          InnerAudioContext.src = ''
          InnerAudioContext.src = that.src
          InnerAudioContext.play()
          if (that.type === 3) {
            that.pause = 'pause'
          }
          that.notiftNum()
        } else {
          that.AudioStop()
        }
      }, 100)
    },
    notiftNum () {
      this.$emit('clickBtnAutio', {})
    },
    AudioStop () {
      console.log(this)
      InnerAudioContext.pause()
      this.pause = ''
      wx.hideToast()
    }
  },
  onHide () {
    InnerAudioContext.stop()
    this.pause = ''
  },
  onUnload () {
    InnerAudioContext.stop()
    this.pause = ''
  }
}
</script>

<style>
.btn-audio .audition{position:absolute; top: 5rpx; left: 0rpx; width: 80rpx; height: 124rpx;}
.btn-audio .accept{position: absolute;top: 237rpx; left: 100rpx;width: 80rpx;height: 80rpx;}
.btn-audio .original{position: absolute;top: 0; left: 0;width: 80rpx;height: 80rpx;}
</style>
