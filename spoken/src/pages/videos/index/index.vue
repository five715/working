<template>
  <div class="container" >
    <div class="player">
      <img src="/static/video_index_v_pic.jpg" alt="">
    </div>
    <div v-if="!isStart" class="player_text">{{text}}</div>
    <img v-if="!isStart" class="btn_began" @click="btnBegan" src="/static/btn_began_imitate.png" alt="">
    <div v-show="isStart" class="card">
      <video-card v-for="(card ,index) in cards" :key="index" :init-now="index+1" :init-sum="cards.length" :init-text="card.text" :init-audition="card.audition"/>
      <div class="hint">读完所有句子计算评分</div>
      <a href="/pages/videos/imitate/main"><img src="/static/btn_count.png" alt="" class="btn_count"></a>
    </div>
  </div>
</template>

<script>
import videoCard from '@/components/video-card'
export default {
  components: {
    videoCard
  },
  data () {
    return {
      text: '在阴森恐怖令人谈之色变的幽灵森林深处，耸立着一幢巍峨庄严的古堡。这里的主人正是声名显赫的吸血鬼德古拉（亚当·桑德勒Adam Sandler 配音）。与传说中不同，德古拉是一个无比温柔的好爸爸，他独自抚养爱女梅菲丝（赛琳娜·戈麦斯 Selena Gomez配音），为了保护女儿免遭人类的戕害，而特意修建了这座名为尖叫旅社的城堡，普通人类绝对无法接近这里。',
      isStart: false,
      cards: [
        {
          text: 'but dad will always be there to protect you.',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3'
        },
        {
          text: 'The outside world is scary',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_2.mp3'
        }
      ]
    }
  },
  methods: {
    btnBegan () {
      this.isStart = true
    }
  },
  onLoad () {
    console.log('onLoad')
  },
  onShow () {
    console.log('onShow')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style>
.player{position: relative;width: 750rpx;height: 420rpx;}
.player_text{margin: 40rpx;font-size: 34rpx;line-height: 60rpx;}
.btn_began{position:absolute;top: 1066rpx;left: 40rpx;width: 670rpx; height: 90rpx;}
.card{margin-bottom: 36rpx;}
.hint{width: 100%; text-align: center; margin: 42rpx 0 41rpx 0;font-size: 26rpx; color: #888888;}
.btn_count{ margin: 0rpx 40rpx;width: 670rpx; height: 90rpx;}


</style>
