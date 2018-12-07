<template>
  <div class="container" >
    <swiper class="swiper_card" previous-margin="60rpx" next-margin="60rpx" @change="onBindChange">
      <block v-for="(card,c) in cards" :key="c">
        <swiper-item>
          <lesson-card :init-type="4" :init-pics="card.pics" :init-text="card.text" :init-writer="card.writer" :init-audition="card.audition"/>
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
          writer: ['do', '因素掌握:[du]'],
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3',
          pics: 98,
          text: {'aux.': '构成疑问句和否定句；代替动词；用于加强语气。', 'vt.': '做；干；进行；从事', 'vi.': '表现；进展；引起；行过', 'n.': '社交聚会；社交活动；宴会'}
        },
        {
          writer: ['do', '因素掌握:[du]'],
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_2.mp3',
          pics: 98,
          text: {'aux.': '构成疑问句和否定句；代替动词；用于加强语气。', 'vt.': '做；干；进行；从事', 'vi.': '表现；进展；引起；行过', 'n.': '社交聚会；社交活动；宴会'}
        }
      ]
    }
  },
  methods: {
    onBindChange (e) {
      this.$refs.pageNumber.now = this.now = e.mp.detail.current + 1
    }
  }
}
</script>

<style>

</style>
