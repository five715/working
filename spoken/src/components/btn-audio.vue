<template>
    <div class="btn-audio">
        <img v-if="type==1" src="/static/ioc_audition.png" class="audition" alt="" @click="onAudition">
        <img v-else-if="type ==2" src="/static/ioc_accept.png" class="accept" alt="" @click="onAudition">
        <img v-else-if="type ==3" :src="'/static/ioc_' + (pause==''?'original':pause) + '.png'" class="original" alt="" @click="onAudition">
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
  methods: {
    onAudition (e) {
      console.log(this.src)
      if (InnerAudioContext.paused) {
        InnerAudioContext.src = this.src
        InnerAudioContext.play()
        if (this.type === 3) {
          this.pause = 'pause'
        }
        this.notiftNum()
      } else {
        InnerAudioContext.pause()
        this.pause = ''
        wx.hideToast()
      }
    },
    notiftNum () {
      this.$emit('clickBtnAutio', {})
    }
  },
  onHide () {
    InnerAudioContext.stop()
  },
  onUnload () {
    InnerAudioContext.stop()
  }
}
</script>

<style>
.btn-audio .audition{position:absolute; top: 5rpx; left: 0rpx; width: 80rpx; height: 124rpx;}
.btn-audio .accept{position: absolute;top: 237rpx; left: 100rpx;width: 80rpx;height: 80rpx;}
.btn-audio .original{position: absolute;top: 0; left: 0;width: 80rpx;height: 80rpx;}
</style>
