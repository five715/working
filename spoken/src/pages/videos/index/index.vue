<template>
  <div class="container" >
    <div class="player">
      <video class="player_video" id="myVideo" :muted="isMuted"
      src='http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400' 
      @timeupdate="onBindTimeUpDate" >
      <cover-image v-show="isPop == 3" class="toast" src="/static/record_time.png" alt/>
      <cover-image v-show="isPop == 1" class="toast" src="/static/record_mic.png" alt/>
      <cover-image v-show="isPop == 2" class="toast" src="/static/record_close.png" alt/>
      </video>
      <img v-if="!isStart" class="player_pic" src="/static/video_index_v_pic.jpg" alt="">
    </div>
    <div class="videos_mask" v-if="isMask" :style="styleScreenHeight"></div>
    <div class="overflow" :style="styleScreenHeight">
      <div v-if="!isStart" class="player_text">{{text}}</div>
      <img v-if="!isStart" class="btn_began" @click="btnBegan" src="/static/btn_began_imitate.png" alt="">
      <div v-show="isStart" class="card" :style="styleScreenHeight">
        <swiper class="video_card" next-margin="600rpx" vertical="true" @change="onBindChange" :current="current">
          <block v-for="(card ,index) in cards" :key="index">
            <swiper-item>
              <video-card ref="videoCard" :init-now="index+1" :init-audition="card.audition" :init-sum="cards.length" :init-text="card.text" :init-duration="card.duration" :init-timepoint="card.timePoint"/>
            </swiper-item>
          </block>
          <swiper-item>
            <div class="hint">读完所有句子计算评分</div>
            <a hover-class="none" href="/pages/videos/imitate/main"><img src="/static/btn_count.png" alt="" class="btn_count"></a>
          </swiper-item>
        </swiper>
        <div class="maskRecord" @touchstart="bindTouchStart" @touchmove="bindTouchMove" @touchend="bindTouchEnd"></div>
      </div>
    </div>
  </div>
</template>

<script>
import videoCard from '@/components/video-card'
import popupToast from '@/components/popup-toast'
export default {
  components: {
    videoCard,
    popupToast
  },
  data () {
    return {
      text: '在阴森恐怖令人谈之色变的幽灵森林深处，耸立着一幢巍峨庄严的古堡。这里的主人正是声名显赫的吸血鬼德古拉（亚当·桑德勒Adam Sandler 配音）。与传说中不同，德古拉是一个无比温柔的好爸爸，他独自抚养爱女梅菲丝（赛琳娜·戈麦斯 Selena Gomez配音），为了保护女儿免遭人类的戕害，而特意修建了这座名为尖叫旅社的城堡，普通人类绝对无法接近这里。',
      isStart: false,
      cards: [
        {
          text: 'The outside world is scary, but dad will always be there to protect you.',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3',
          timePoint: 0,
          duration: 5
        },
        {
          text: 'The outside world is scary, but dad will always be there to protect you.',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_2.mp3',
          timePoint: 5,
          duration: 3
        },
        {
          text: 'The outside world is scary, but dad will always be there to protect you.',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_3.mp3',
          timePoint: 10,
          duration: 4
        },
        {
          text: 'The outside world is scary, but dad will always be there to protect you.',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_4.mp3',
          timePoint: 15,
          duration: 6
        }
      ],
      screenHeight: '',
      videoContext: null,
      current: 0,
      isMask: false,
      isMuted: false,
      isPop: 0
    }
  },
  computed: {
    styleScreenHeight () {
      return `height:${this.screenHeight - 422}rpx;`
    },
    nextMarginScreenHeight () {
      return `360rpx;`
    }
  },
  methods: {
    bindTouchStart (e) {
      e.this = this.$refs.videoCard[this.current].$refs.btnRecord
      e.this.onTouchStart(e)
    },
    bindTouchMove (e) {
      e.this = this.$refs.videoCard[this.current].$refs.btnRecord
      e.this.onTouchMove(e)
    },
    bindTouchEnd (e) {
      e.this = this.$refs.videoCard[this.current].$refs.btnRecord
      e.this.onTouchEnd(e)
    },
    stopTouchMove () {
      return false
    },
    btnBegan () {
      this.isStart = true
      this.videoContext.play()
    },
    onBindChange (e) {
      var that = this
      var cards = that.cards
      var current = that.current = e.mp.detail.current
      var card = cards[current]
      var videoCard = that.$refs.videoCard
      if (card) {
        that.videoContext.seek(card.timePoint)
        that.videoContext.play()
        console.log(`卡片编号:${current + 1}`, `时间点:${card.timePoint}`, videoCard[current].onAudioStop())
      }
      for (var i = 0; i < videoCard.length; i++) {
        if (i === current) videoCard[i].isMask = false
        else videoCard[i].isMask = true
      }
    },
    onBindTimeUpDate (e) {
      var that = this
      var cards = that.cards
      var current = that.current
      var card = cards[current]
      if (card && e.target.currentTime >= card.timePoint + card.duration) {
        that.videoContext.seek(card.timePoint)
      }
    }
  },
  onLoad () {
    this.isStart = false
    this.isMask = false
    this.isMuted = false
    var that = this
    wx.getSystemInfo({
      success: (result) => {
        that.screenHeight = result.windowHeight * (750 / result.windowWidth)
      }
    })
    console.log(this.isPop)
  },
  onReady () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  created () {
    var that = this
    that.Global.isPop = function (n) {
      that.isPop = n
    }
  }
}
</script>

<style>
.player{position: absolute;width: 750rpx;height: 420rpx; top: 0;}
.player_video{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.player_pic{position:absolute;}
.overflow{position: absolute;top: 420rpx; width: 100%;overflow: auto}
.overflow .hint{width: 100%; text-align: center; margin: 42rpx 0 41rpx 0;font-size: 26rpx; color: #888888;}
.overflow .btn_began{position:absolute;left: 40rpx;width: 670rpx; height: 90rpx;}
.btn_count{ margin: 0rpx 40rpx;width: 670rpx; height: 90rpx;}
.player_text{margin: 40rpx;font-size: 34rpx;line-height: 60rpx;}

.videos_mask{position: absolute;top: 420rpx; width: 100%;z-index: 1;}

.overflow .card{overflow: hidden;}
.overflow .maskRecord{position: absolute; top: 272rpx; left: 260rpx; width: 230rpx;height: 90rpx;}
.video_card{width: 100%; height: 1043rpx;}


.player_video .toast {
  width: 260rpx;
  height: 260rpx;
  position: fixed;
  top: 108rpx;
  left: 245rpx;
}

</style>
