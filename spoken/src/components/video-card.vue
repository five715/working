<template>
  <div class="video-card">
    <div class="line"></div>
    <pageNumber :init-top="40" :init-left="30" :init-now="now" :init-sum="sum"/>
    <div class="text">{{text}}</div>
    <btnAudio ref="btnAudio" :init-type="2"/>
    <div class="btn_record">
      <btnRecord  @setSrc="bindSetSrc" />
    </div>
    <div class="original">
      <btnAudio :init-src="src" :init-type="3"/>
    </div>
  </div>
</template>

<script>
import btnAudio from '@/components/btn-audio'
import btnRecord from '@/components/btn-record'
import pageNumber from '@/components/page-number'
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
    initAudition: {
      type: String,
      default: ''
    }
  },
  components: {
    btnRecord,
    pageNumber,
    btnAudio
  },
  data () {
    return {
      text: this.initText,
      now: this.initNow,
      sum: this.initSum,
      src: this.initAudition
    }
  },
  methods: {
    bindSetSrc (e) {
      this.$refs.btnAudio.src = e.src
    }
  }
}
</script>
<style>
.video-card{position: relative; margin: 36rpx 40rpx 0 40rpx;width: 670rpx;height:363rpx;
  border: 1px #d3d3d3 solid; border-radius:10rpx; box-shadow:0rpx 0rpx 50rpx 15rpx #eee; overflow: hidden; }
.video-card .line{position: absolute;top: 0;left: 0; width: 11rpx;height: 100%;background: #338bff;}
.video-card .text{position: absolute;top: 112rpx; left: 41rpx;width: 600rpx;margin: 0;line-height: 50rpx;font-size: 34rpx}
.original{position: absolute;top: 237rpx; left: 490rpx;width: 80rpx;height: 80rpx;}
.btn_record{position: absolute;top: 232rpx; left: 220rpx;}

</style>

