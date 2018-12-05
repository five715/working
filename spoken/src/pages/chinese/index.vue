<template>
  <div class="container" >
    <img class="index_pic" src="/static/chinese_pic.jpg" alt="">
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
          src: '/static/ioc_boxes_chinese_recite.png',
          href: '',
          text: '唐诗背诵'
        },
        {
          src: '/static/ioc_boxes_chinese_shizi.png',
          href: '',
          text: '识字'
        },
        {
          src: '/static/ioc_boxes_chinese_read.png',
          href: '',
          text: '读词'
        },
        {
          src: '/static/ioc_boxes_chinese_lesson.png',
          href: '',
          text: '课文片段'
        },
        {
          src: '/static/ioc_boxes_expect.png',
          href: '',
          text: '敬请期待'
        },
        {}, {}, {}, {}
      ]
    }
  }
}
</script>
<style>

</style>

