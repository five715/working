<template>
  <div class="container" >
    <swiper class="swiper_card" previous-margin="60rpx" next-margin="60rpx" @change="onBindChange">
      <block v-for="(card,c) in cards" :key="c">
        <swiper-item>
          <lesson-card ref="lessonCard" :init-type="4" :init-pics="card.pics" :init-text="card.text" :init-writer="card.writer" :init-audition="card.audition"/>
        </swiper-item>
      </block>
    </swiper>
    <page-number :init-now="now" :init-sum="cards.length" ref="pageNumber" />
  </div>
</template>

<script>
import pageNumber from '@/components/page-number'
import lessonCard from '@/components/lesson-card'
export default {
  components: {
    pageNumber,
    lessonCard
  },
  data () {
    return {
      now: 1,
      cards: [
        {
          writer: ['多', '因素掌握：duō'],
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3',
          pics: 98,
          text: ['数量大（跟“少、寡”相对）。', '超出原有或应有的数目；比原来的数目有所增加（跟“少”相对）。', '过分的；不必要的。']
        },
        {
          writer: ['多', '因素掌握：duō'],
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3',
          pics: 98,
          text: ['数量大（跟“少、寡”相对）。', '超出原有或应有的数目；比原来的数目有所增加（跟“少”相对）。', '过分的；不必要的。']
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
