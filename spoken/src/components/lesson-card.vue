<template>
  <div v-if="type==1" class="lesson-card">
    <img class="pic" :src="pics" alt>
    <span class="text">
      {{text}}
      <br>
      <span class="writer">{{writer}}</span>
    </span>
    <sound-enter :init-src="audition"/>
  </div>
  <div v-else-if="type==2" class="lesson-card .lesson-card-type-2">
    <img class="pic" :src="pics" alt>
    <span class="text">
      {{text}}
      <br>
      <span class="writer">{{writer}}</span>
    </span>
    <div class="play">
      <btnAudio :init-type="3" :init-src="audition" @clickBtnAutio="onClickBtnAutio"/>
    </div>
    <sound-enter :init-src="audition" :init-href="evaluation"/>
  </div>
</template>

<script>
import soundEnter from '@/components/sound-enter'
import btnAudio from '@/components/btn-audio'
export default {
  components: {
    soundEnter,
    btnAudio
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
    },
    initType: {
      type: Number,
      default: 1
    },
    initEvaluation: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pics: this.initPics,
      text: this.initText,
      writer: this.initWriter,
      audition: this.initAudition,
      type: this.initType,
      evaluation: this.initEvaluation
    }
  },
  methods: {
    onClickBtnAutio (data) {
      wx.showToast({icon: 'none', title: '播放原声'})
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
.lesson-card-type-2 .pic{
  width: 508rpx;height: 550rpx;
}
.lesson-card-type-2 .text{
  top: 659rpx;
  line-height: 48rpx;
}
.lesson-card-type-2 .writer {
  float: left;
  font-size: 26rpx;
}
.lesson-card-type-2 .play{
  position:absolute;
  top: 550rpx;
  left: 253rpx;
  width: 80rpx;
  height: 50rpx;
}
</style>
