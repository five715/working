<template>
  <div class="container" style="background:#ffffff;" >
    <a hover-class="none" href="/pages/videos/imitate/main?degrees=true" v-for="(list, l) in lists" :key="l" >
      <followList :init-title="list.title" :init-pic="list.pic" :init-grade="list.grade"/>
    </a>
  </div>  
</template>

<script>
import followList from '@/components/follow-list'
export default {
  components: {
    followList
  },
  data () {
    return {
      lists: [
        {
          title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 5
        },
        {
          title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 4
        },
        {
          title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 3
        },
        {
          title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 2
        },
        {
          title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 1
        },
        {
          title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 0
        }
      ]
    }
  }
}
</script>

<style>

</style>
