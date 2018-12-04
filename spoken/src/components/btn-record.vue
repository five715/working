<template>
  <div class="btn-record">
    <img src="/static/ioc_record.png" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" class="record" alt="">
  </div>
</template>
<script>
export default {
  data () {
    return {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    onTouchStart (e) {
      this.startX = e.pageX
      this.startY = e.pageY
      console.log(this.startX, this.startY)
    },
    onTouchMove (e) {
      this.x = e.pageX
      this.y = e.pageY
      console.log(this.x, this.y)
    },
    onTouchEnd (e) {
      console.log(e, Math.abs(this.y - this.startY))
    }
  }
}
</script>

<style>
.btn-record .record{width: 230rpx; height: 90rpx;}
</style>
