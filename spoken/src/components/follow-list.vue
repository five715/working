<template>
  <div class="follow-list">
    <img :src="pic" alt="" class="follow_list_pic">
    <div class="follow_list_title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    initTitle: {
      type: String,
      default: ''
    },
    initPic: {
      type: String,
      default: ''
    },
    initgrade: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      title: this.initTitle,
      pic: this.initPic,
      grade: this.initgrade
    }
  }
}
</script>

<style>
.follow-list{position:relative;}
</style>
