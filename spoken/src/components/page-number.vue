<template>
  <div class="page-number" :style="initStyle">
      <div class="sum"><span class="now">{{now}}</span> / {{sum}}</div>
  </div>
</template>

<script>
export default {
  props: {
    initNow: {
      type: Number,
      default: 1
    },
    initSum: {
      type: Number,
      default: 11
    },
    initTop: {
      type: Number,
      default: 1140
    },
    initLeft: {
      type: Number,
      default: 317.5
    }
  },
  data () {
    return {
      now: this.initNow,
      sum: this.initSum,
      top: this.initTop,
      left: this.initLeft
    }
  },
  computed: {
    initStyle () {
      return `top:${this.top}rpx;left:${this.left}rpx;`
    }
  }
}
</script>
<style>
.page-number{position:absolute;width: 115rpx; text-align: center;}
.page-number .sum{color: #888888;font-size: 26rpx;}
.page-number .now{color: #338bff;font-size: 34rpx;}
</style>

