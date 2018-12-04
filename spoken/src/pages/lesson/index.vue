<template>
  <div class="container" >
    <div class="box">
      <img class="pic" src="/static/lesson_pic.jpg" alt="">
      <span class="text">{{text}}<br/><span class="writer">{{writer}}</span></span>
      <sound-enter/>
    </div>
    <page-number/>
  </div>
</template>

<script>
import soundEnter from '@/components/sound-enter'
import pageNumber from '@/components/page-number'
export default {
  components: {
    soundEnter,
    pageNumber
  },
  data () {
    return {
      text: '车窗外面是茫茫的大戈壁，没有山，没有水，也没有人烟。天和地的界限并不是那么清晰，都是混黄一体。',
      writer: '选自《白杨》'
    }
  },
  onLoad () {
    console.log('onLoad')
  },
  onShow () {
    console.log('onShow')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style>
.box{position: absolute;top: 41rpx;left:80rpx; width: 590rpx;height: 1065rpx; box-shadow:0rpx 0rpx 50rpx 15rpx #eee;
border-radius: 10rpx; border:1px solid #d3d3d3;
}
.box .pic{position: absolute; top: 40rpx; left: 41rpx; width: 508rpx;height: 420rpx;}
.box span{line-height: 60rpx;}
.box .text{position: absolute;  top: 500rpx; left: 43rpx; width: 507rpx; height: 211rpx; font-size: 34rpx;}
.box .writer{color: #888888;float: right;}



</style>
