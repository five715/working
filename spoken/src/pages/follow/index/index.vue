<template>
  <div class="container" >
    <swiper class="swiper_card" previous-margin="60rpx" next-margin="60rpx" @change="onBindChange">
      <block v-for="(card,c) in cards" :key="c">
        <swiper-item>
          <lesson-card ref="lessonCard" :init-type="2" :init-pics="card.pics" :init-text="card.text" :init-writer="card.writer" :init-audition="card.audition" :init-evaluation="evaluation"/>
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
      evaluation: '/pages/follow/lists/main',
      cards: [
        {
          pics: '/static/follow_pic.jpg',
          text: 'There is nothing but conceit praise.',
          writer: '自负人耳中只有溢美之词',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3'
        },
        {
          pics: '/static/follow_pic.jpg',
          text: 'There is nothing but conceit praise.',
          writer: '自负人耳中只有溢美之词',
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_3.mp3'
        }
      ]
    }
  },
  methods: {
    onBindChange (e) {
      this.$refs.lessonCard[this.now - 1].onSwiperChange()
      this.$refs.pageNumber.now = this.now = e.mp.detail.current + 1
    }
  }
}
</script>

<style>
.swiper{position: fixed;width: 100%;height: 1334rpx;top: 0;left: 0;}

</style>
