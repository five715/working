<template>
  <div class="container" >
    <swiper class="swiper_card" previous-margin="60rpx" next-margin="60rpx" @change="onBindChange">
      <block v-for="(card,c) in cards" :key="c">
        <swiper-item>
          <lesson-card ref="lessonCard" :init-pics="card.pics" :init-text="card.text" :init-writer="card.writer" :init-audition="card.audition"/>
        </swiper-item>
      </block>
    </swiper>
    <page-number :init-now="now" :init-sum="cards.length" ref="pageNumber" />
    <popupToast/>
  </div>
</template>

<script>
import pageNumber from '@/components/page-number'
import lessonCard from '@/components/lesson-card'
import popupToast from '@/components/popup-toast'
export default {
  components: {
    pageNumber,
    lessonCard,
    popupToast
  },
  data () {
    return {
      now: 1,
      cards: [
        {
          pics: '/static/lesson_pic.jpg',
          text: '车窗外面是茫茫的大戈壁，没有山，没有水，也没有人烟。天和地的界限并不是那么清晰，都是混黄一体。',
          writer: '选自《白杨》',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3'
        },
        {
          pics: '/static/lesson_pic.jpg',
          text: '车窗外面是茫茫的大戈壁，没有山，没有水，也没有人烟。天和地的界限并不是那么清晰，都是混黄一体。',
          writer: '选自《白杨》',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_2.mp3'
        },
        {
          pics: '/static/lesson_pic.jpg',
          text: '车窗外面是茫茫的大戈壁，没有山，没有水，也没有人烟。天和地的界限并不是那么清晰，都是混黄一体。',
          writer: '选自《白杨》',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_3.mp3'
        }
      ]
    }
  },
  methods: {
    onBindChange (e) {
      this.$refs.pageNumber.now = this.now = e.mp.detail.current + 1
      this.$refs.lessonCard[this.now - 1].onSwiperChange()
    }
  }
}
</script>

<style>
</style>
