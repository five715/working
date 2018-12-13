<template>
  <div class="video-card">
    <div class="line"></div>
    <pageNumber :init-top="40" :init-left="30" :init-now="now" :init-sum="sum"/>
    <div class="text">{{text}}</div>
    <div class="rate">
      <line-degree ref="lineDegree" :init-type="2" :init-time="duration"/>
    </div>
    <div class="original" v-show="isPlay">
      <btnAudio ref="btnAudio" :init-type="3" @audioStart="bindAudioStart"/>
    </div>
    <div class="btn_record">
      <btnRecord :init-type="2" :init-duration="duration"  @setSrc="bindSetSrc" @setRate="bindSetRate" @recordStart="bindRecordStart"/>
    </div>
    <div class="video_card_mask" v-if="isMask" @click="onVideoCardMask"></div>
  </div>
</template>

<script>
import btnAudio from '@/components/btn-audio'
import btnRecord from '@/components/btn-record'
import pageNumber from '@/components/page-number'
import lineDegree from '@/components/line-degree'
export default {
  props: {
    initText: {
      type: String,
      default: 'demo.'
    },
    initNow: {
      type: Number,
      default: 1
    },
    initSum: {
      type: Number,
      default: 11
    },
    initDuration: {
      type: Number,
      default: 0
    },
    initTimepoint: {
      type: Number,
      default: 0
    }
  },
  components: {
    btnRecord,
    pageNumber,
    btnAudio,
    lineDegree
  },
  data () {
    return {
      text: this.initText,
      now: this.initNow,
      sum: this.initSum,
      duration: this.initDuration,
      timePoint: this.initTimepoint,
      isPlay: false,
      isMask: true
    }
  },
  onLoad () {
    this.isMask = this.now !== 1
  },
  methods: {
    onVideoCardMask (e) {
      this.$parent.current = this.now - 1
    },
    bindSetSrc (e) {
      console.log('录音结束')
      var that = this
      that.$parent.videoContext.pause()
      that.$parent.isMuted = false
      console.log(e)
      that.$refs.btnAudio.src = e.src
      that.$refs.btnAudio.onAuditionTypeThree()
      that.isPlay = true
      setTimeout(function () {
        that.$refs.btnAudio.onStop()
      }, e.duration)
      that.$parent.isMask = false
    },
    bindSetRate (e) {
      console.log('录音中')
      this.$refs.lineDegree.per = (e.nowDuration / 1000) / this.duration * 100
    },
    bindRecordStart (e) {
      console.log('录音开始')
      var that = this
      that.isPlay = false
      that.onAudioStop()
      console.log(that.timePoint)
      that.$parent.videoContext.seek(that.timePoint)
      that.$parent.videoContext.play()
      that.$parent.isMuted = true
      that.$parent.isMask = true
    },
    onAudioStop () {
      var that = this
      that.$refs.btnAudio.onStop()
    },
    bindAudioStart (e) {
      var that = this
      console.log('播放音频')
      e.InnerAudioContext.seek(0)
      setTimeout(function () {
        that.$refs.btnAudio.onStop()
      }, that.duration * 1000)
      that.$parent.videoContext.pause()
    }
  }
}
</script>
<style>
.video-card{position: relative; margin: 36rpx 40rpx 0 40rpx;width: 670rpx;height:363rpx;
  border: 1px #d3d3d3 solid; border-radius:10rpx; box-shadow:0rpx 0rpx 50rpx 15rpx #eee; overflow: hidden; }
.video-card .line{position: absolute;top: 0;left: 0; width: 11rpx;height: 100%;background: #338bff;}
.video-card .text{position: absolute;top: 112rpx; left: 41rpx;width: 600rpx;margin: 0;line-height: 50rpx;font-size: 34rpx}
.original{position: absolute;top: 237rpx; left: 440rpx;width: 80rpx;height: 80rpx;}
.btn_record{position: absolute;top: 237rpx; left: 540rpx;}
.video-card .rate{position: absolute; top: 260rpx; left: 50rpx;}
.video_card_mask{position: absolute;width:100%;height:100%;}

</style>

