<template>
  <div class="container" >
    <swiper class="swiper_card" previous-margin="60rpx" next-margin="60rpx" @change="onBindChange">
      <block v-for="(card,c) in cards" :key="c">
        <swiper-item>
          <lesson-card :init-type="5" :init-pics="card.pics" :init-text="card.text" :init-writer="card.writer" :init-audition="card.audition"/>
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
          writer: ['静夜思', '唐 李白'],
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3',
          text: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。']
        },
        {
          writer: ['静夜思', '唐 李白'],
          audition: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_1.mp3',
          text: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。']
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
