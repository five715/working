<template>
  <div class="container" >
    <img class="index_pic" src="/static/correct_pic.jpg" alt="">
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
          src: '/static/ioc_boxes_correct_math.png',
          href: '',
          text: '数学作业批改'
        },
        {
          src: '/static/ioc_boxes_correct_english.png',
          href: '',
          text: '英语作业批改'
        },
        {
          src: '/static/ioc_boxes_expect.png',
          href: '',
          text: '敬请期待'
        },
        {}, {}, {}, {}, {}, {}
      ]
    }
  }
}
</script>
<style>

</style>

