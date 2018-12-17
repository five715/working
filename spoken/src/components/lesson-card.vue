<template>
  <div v-if="type==1" class="lesson-card">
    <img class="pic" :src="pics" alt>
    <span class="text">
      {{text}}
      <br>
      <span class="writer">{{writer}}</span>
    </span>
    <sound-enter ref="soundEnter" :init-src="audition"/>
  </div>
  <div v-else-if="type==2" class="lesson-card .lesson-card-type-2">
    <img class="pic" :src="pics" alt>
    <span class="text">
      {{text}}
      <br>
      <span class="writer">{{writer}}</span>
    </span>
    <div class="play">
      <btnAudio :init-type="3" :init-src="audition"  @clickBtnAutio="onClickBtnAutio"/>
    </div>
    <sound-enter ref="soundEnter" :init-src="audition" :init-href="evaluation" @clickStart="onSwiperChange" />
  </div>
  <div v-else-if="type==3" class="lesson-card .lesson-card-type-3">
    <div class="pinyin">
      <img src="/static/words_pinyin_line.png" class="pinyin_line" />
      <span class="pinyin_text">{{writer[0]}}</span>
    </div>
    <div class="lesson_card_text">
      <div class="lesson_card_text_t" v-for="(exp,e) in text" :key="e">
        <p class="front">{{e}}</p><p class="back">{{exp}}</p>
      </div>
    </div>
    <div class="lesson_card_type_line"></div>
    <div class="play"><btnAudio :init-type="3" :init-src="audition" @clickBtnAutio="onClickBtnAutio"/></div>
    <div class="lesson_card_type_score_hint">本次得分</div>
    <div class="lesson_card_type_score">{{pics}}</div>
    <div class="lesson_card_type_master">{{writer[1]}}</div>
    <sound-enter ref="soundEnter" :init-src="audition" :init-href="evaluation" :init-look="false" @clickStart="onSwiperChange" />
  </div>
  <div v-else-if="type==4" class="lesson-card .lesson-card-type-4">   
    <div class="hanzi">
      <img src="/static/shizi_hanzi_box.png" class="hanzi_box" />
      <span class="hanzi_text">{{writer[0]}}</span>
    </div>
    <div class="lesson_card_text">
      <div class="lesson_card_text_t" v-for="(exp,e) in text" :key="e">
        <p class="front">{{e+1}}、</p><p class="back">{{exp}}<a hover-class="none" class="lesson_card_more" v-if="e==text.length-1" href="#">查看更多</a></p>
      </div>
    </div> 
    <div class="lesson_card_type_line"></div>
    <div class="lesson_card_type_score_hint">本次得分</div>
    <div class="lesson_card_type_score">{{pics}}</div>
    <div class="lesson_card_type_master">{{writer[1]}}</div>
    <sound-enter ref="soundEnter" :init-src="audition" :init-href="evaluation" :init-look="false"/>
  </div>
  <div v-else-if="type==5" class="lesson-card .lesson-card-type-5">
    <div class="lesson_card_title">{{writer[0]}}</div>
    <div class="lesson_card_writer">{{writer[1]}}</div>
    <div class="lesson_card_text">
      <p v-for="(tex,t) in text" :key="t">{{tex}}</p>
    </div>
    <sound-enter ref="soundEnter" :init-src="audition" :init-href="evaluation"/>
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
    initPics: {type: String, default: ''},
    initText: {type: String, default: ''},
    initWriter: {type: String, default: ''},
    initAudition: {type: String, default: ''},
    initType: {type: Number, default: 1},
    initEvaluation: {type: String, default: ''}
  },
  data () {
    return {
      pics: this.initPics,
      text: this.initText,
      writer: this.initWriter,
      audition: this.initAudition,
      type: this.initType, // 1:课文片段;2:绘本跟读;3:背单词;4:识字;5:唐诗背诵
      evaluation: this.initEvaluation
    }
  },
  methods: {
    onClickBtnAutio (data) {
      wx.showToast({icon: 'none', title: '播放原声'})
    },
    onSwiperChange (e) {
      this.$refs.soundEnter.onAudioPause()
    }
  }
}
</script>

<style>
.lesson-card {position: absolute;top: 41rpx;left: 20rpx;width: 590rpx;height: 1065rpx;box-shadow: 0rpx 0rpx 50rpx 15rpx #ddd;border-radius: 10rpx;border: 1px solid #d3d3d3;}
.lesson-card .pic {position: absolute;top: 40rpx;left: 41rpx;width: 508rpx;height: 420rpx;}
.lesson-card span {line-height: 60rpx;}
.lesson-card .text {position: absolute;top: 500rpx;left: 43rpx;width: 507rpx;height: 211rpx;font-size: 34rpx;}
.lesson-card .writer {color: #888888;float: right;margin-top:30rpx;}

.lesson-card-type-2 .pic{width: 508rpx;height: 550rpx;}
.lesson-card-type-2 .text{top: 659rpx;line-height: 48rpx;}
.lesson-card-type-2 .writer {float: left;font-size: 26rpx;}
.lesson-card-type-2 .play{position:absolute;top: 550rpx;left: 253rpx;width: 80rpx;height: 80rpx;}

.lesson-card-type-3 .play{position:absolute;top: 485rpx;left: 253rpx;width: 80rpx;height: 80rpx;}
.lesson-card-type-3 .pinyin{position: absolute;top: 40rpx;left: 40rpx; width: 509rpx;height: 67rpx;}
.lesson-card-type-3 .pinyin_text{position: absolute;width: 100%;top: 0;left: 0; line-height: 50rpx;text-align: center;font-size: 60rpx;}
.lesson-card-type-3 .lesson_card_text{position: absolute;top:162rpx;left: 40rpx;width: 520rpx; font-size: 26rpx}
.lesson-card-type-3 .lesson_card_text_t{position: relative; line-height: 40rpx;margin-top: 5rpx;}
.lesson-card-type-3 .lesson_card_text .front{color: #888888; position: absolute;top: 0rpx;}
.lesson-card-type-3 .lesson_card_text .back{margin-left: 80rpx;}
.lesson_card_type_line{position: absolute;top: 524rpx;left: 41rpx;width: 509rpx;height: 2rpx;background: #dbdbdb;}
.lesson_card_type_score_hint{position:absolute;font-size: 26rpx;left: 41rpx;top: 563rpx; color: #888888;}
.lesson_card_type_score{position:absolute;font-size: 100rpx;top: 636rpx; text-align: center;width: 100%; color: #338bff;line-height: 1;}
.lesson_card_type_master{position:absolute;font-size: 26rpx;top: 748rpx; text-align: center;width: 100%;}

.lesson-card-type-4 .hanzi{position: absolute;top: 40rpx;left: 195rpx;width: 200rpx;height: 200rpx;}
.lesson-card-type-4 .hanzi_text{position: absolute;top: 0;left: 0; font-size: 180rpx;width: 100%; text-align: center;line-height: 200rpx;}
.lesson-card-type-4 .lesson_card_text{position:absolute; top: 290rpx; left: 40rpx; width: 508rpx; color: #888888; font-size: 26rpx;}
.lesson-card-type-4 .lesson_card_text_t{position: relative; line-height: 40rpx;margin-top: 5rpx;}
.lesson-card-type-4 .lesson_card_text .front{position: absolute;top: 0rpx;}
.lesson-card-type-4 .lesson_card_text .back{margin-left: 40rpx;}
.lesson-card-type-4 .lesson_card_more{display: inline;color: #338bff}

.lesson-card-type-5 .lesson_card_title{margin-top: 130rpx;width: 100%;text-align: center;font-size: 48rpx;}
.lesson-card-type-5 .lesson_card_writer{margin-top: 25rpx;width: 100%;text-align: center;font-size: 36rpx; color: #888;}
.lesson-card-type-5 .lesson_card_text{margin-top: 60rpx;width: 100%;text-align: center;font-size: 36rpx;margin-left: 20rpx;letter-spacing: 5rpx;line-height: 60rpx;}


</style>
