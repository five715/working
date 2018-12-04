<template>
  <div class="sound-enter">
    <img src="/static/ioc_audition.png" class="audition" alt="">
    <div class="btn_record">
      <btnRecord/>
    </div>
    <img src="/static/ioc_look.png" class="look" alt="">
  </div>
</template>

<script>
import btnRecord from '@/components/btn-record'
export default {
  components: {
    btnRecord
  },
  data () {
    return {

    }
  }
}
</script>
<style>
.sound-enter{position:absolute;top: 905rpx;left: 40rpx;width: 509rpx; height: 129rpx;}
.sound-enter .btn_record{position:absolute; top: 0rpx; left: 137rpx;}
.sound-enter .audition{position:absolute; top: 5rpx; left: 0rpx; width: 80rpx; height: 124rpx;}
.sound-enter .look{position:absolute; top: 5rpx; left: auto; right: 0rpx; width: 80rpx; height: 124rpx;}
</style>

