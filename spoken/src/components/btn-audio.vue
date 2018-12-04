<template>
    <div class="btn-audio">
        <img v-if="type==1" src="/static/ioc_audition.png" class="audition" alt="" @click="onAudition">
        <img v-else-if="type ==2" src="/static/ioc_accept.png" class="accept" alt="" @click="onAudition">
        <img v-else-if="type ==3" src="/static/ioc_original.png" class="original" alt="" @click="onAudition">
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
      src: this.initSrc
    }
  },
  methods: {
    onAudition (e) {
      console.log(this.src)
      InnerAudioContext.src = this.src
      InnerAudioContext.play()
    }
  }
}
</script>

<style>
.btn-audio .audition{position:absolute; top: 5rpx; left: 0rpx; width: 80rpx; height: 124rpx;}
.btn-audio .accept{position: absolute;top: 237rpx; left: 100rpx;width: 80rpx;height: 80rpx;}
.btn-audio .original{position: absolute;top: 0; left: 0;width: 80rpx;height: 80rpx;}
</style>
