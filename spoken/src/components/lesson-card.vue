<template>
  <div class="lesson-card">
    <img class="pic" :src="pics" alt>
    <span class="text">{{text}}<br><span class="writer">{{writer}}</span></span>
    <sound-enter :init-src="audition"/>
  </div>
</template>

<script>
import soundEnter from '@/components/sound-enter'
export default {
  components: {
    soundEnter
  },
  props: {
    initPics: {
      type: String,
      default: ''
    },
    initText: {
      type: String,
      default: ''
    },
    initWriter: {
      type: String,
      default: ''
    },
    initAudition: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pics: this.initPics,
      text: this.initText,
      writer: this.initWriter,
      audition: this.initAudition
    }
  }
}
</script>

<style>
.lesson-card {
  position: absolute;
  top: 41rpx;
  left: 20rpx;
  width: 590rpx;
  height: 1065rpx;
  box-shadow: 0rpx 0rpx 50rpx 15rpx #eee;
  border-radius: 10rpx;
  border: 1px solid #d3d3d3;
}
.lesson-card .pic {
  position: absolute;
  top: 40rpx;
  left: 41rpx;
  width: 508rpx;
  height: 420rpx;
}
.lesson-card span {
  line-height: 60rpx;
}
.lesson-card .text {
  position: absolute;
  top: 500rpx;
  left: 43rpx;
  width: 507rpx;
  height: 211rpx;
  font-size: 34rpx;
}
.lesson-card .writer {
  color: #888888;
  float: right;
}
</style>
