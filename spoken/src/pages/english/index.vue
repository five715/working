<template>
  <div class="container" >
    <a v-for="(nav,n) in navs" :key="n" :href="nav.href">{{nav.text}}</a>
    <!-- <boxes v-for="(nav,n) in navs" :key="n" :init-text="nav.text" :init-href="nav.href" :init-src="nav.src"/> -->
  </div>
</template>

<script>
import boxes from '@/components/index-boxes'
export default {
  components: {
    boxes
  },
  data () {
    return {
      navs: [
        {
          src: '/static/ioc_boxes_video.png',
          href: '/pages/lesson/main',
          text: '课文片段'
        },
        {
          src: '/static/ioc_boxes_video.png',
          href: '/pages/videos/index/main',
          text: '视频模仿'
        }
      ]
    }
  }
}
</script>
<style>

</style>

