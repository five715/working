<template>
  <div class="container" >
    <img class="index_pic" src="/static/english_pic.jpg" alt="">
    <boxes v-for="(nav,n) in navs" :key="n" :init-text="nav.text" :init-href="nav.href" :init-src="nav.src"/>
    <contactUs/>
  </div>
</template>

<script>
import contactUs from '@/components/contact-us'
import boxes from '@/components/index-boxes'
export default {
  components: {
    boxes,
    contactUs
  },
  data () {
    return {
      navs: [
        {
          src: '/static/ioc_boxes_english_follow.png',
          href: '/pages/follow/lists/main',
          text: '绘本跟读'
        },
        {
          src: '/static/ioc_boxes_english_exam.png',
          href: '',
          text: '口语考试'
        },
        {
          src: '/static/ioc_boxes_english_video.png',
          href: '/pages/videos/index/main',
          text: '视频模仿'
        },
        {
          src: '/static/ioc_boxes_english_job.png',
          href: '',
          text: '口语作业'
        },
        {
          src: '/static/ioc_boxes_english_appraisal.png',
          href: '/pages/defined/main',
          text: '自定义测评'
        },
        {
          src: '/static/ioc_boxes_english_words.png',
          href: '/pages/words/main',
          text: '背单词'
        },
        {
          src: '/static/ioc_boxes_expect.png',
          href: '',
          text: '敬请期待'
        }, {}, {}
      ]
    }
  }
}
</script>
<style>

</style>

