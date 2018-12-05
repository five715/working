<template>
  <div class="container" >
    <followList v-for="(list, l) in lists" :key="l" :init-title="list.title" :init-pic="list.pic" :init-grade="list.grade"/>
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
          title: '标题标题标题标题标题',
          pic: '/static/follow_list_pic_1.jpg',
          grade: 3
        }
      ]
    }
  }
}
</script>

<style>

</style>
