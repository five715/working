<template>
  <div class="container" >
    <div class="player">
      <video class="player_video"></video>
      <img class="player_pic" src="/static/video_index_v_pic.jpg" alt="">
    </div>
    <div class="overflow" :style="styleScreenHeight">
      <div v-if="!isStart" class="player_text">{{text}}</div>
      <img v-if="!isStart" class="btn_began" @click="btnBegan" src="/static/btn_began_imitate.png" alt="">
      <div v-show="isStart" class="card">
        <video-card v-for="(card ,index) in cards" :key="index" :init-now="index+1" :init-sum="cards.length" :init-text="card.text" :init-audition="card.audition"/>
        <div class="hint">读完所有句子计算评分</div>
        <a href="/pages/videos/imitate/main"><img src="/static/btn_count.png" alt="" class="btn_count"></a>
      </div>
    </div>
    <popupToast/>
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
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3'
        },
        {
          text: 'The outside world is scary, but dad will always be there to protect you.',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_2.mp3'
        }
      ],
      screenHeight: ''
    }
  },
  computed: {
    styleScreenHeight () {
      return `height:${this.screenHeight - 422}rpx;`
    }
  },
  methods: {
    btnBegan () {
      this.isStart = true
    }
  },
  onLoad () {
    this.isStart = false
    var that = this
    wx.getSystemInfo({
      success: (result) => {
        that.screenHeight = result.windowHeight * (750 / result.windowWidth)
      }
    })
  }
}
</script>

<style>
.player{position: absolute;width: 750rpx;height: 420rpx; top: 0;}
.player_video{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.player_pic{position:absolute;}
.overflow{position: absolute;top: 420rpx; height: 780rpx;overflow: auto}
.overflow .hint{width: 100%; text-align: center; margin: 42rpx 0 41rpx 0;font-size: 26rpx; color: #888888;}
.overflow .btn_began{position:absolute;left: 40rpx;width: 670rpx; height: 90rpx;}
.btn_count{ margin: 0rpx 40rpx;width: 670rpx; height: 90rpx;}
.player_text{margin: 40rpx;font-size: 34rpx;line-height: 60rpx;}
.card{margin-bottom: 36rpx;}


</style>
