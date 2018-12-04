<template>
  <div class="line-degree">
    <div class="lomo_hint">{{hint}}</div>
    <div class="degree">
      <div class="rate" :style="countPer"></div>
    </div>
    <div class="per">{{per}}%</div>
  </div>
</template>
<script>
export default {
  props: {
    initHint: {
      type: String,
      default: '精确度'
    },
    initPer: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      per: this.initPer,
      hint: this.initHint
    }
  },
  computed: {
    countPer () {
      var per = this.per
      var width = `width:${this.per}%;`
      var color = ''
      if (per > 60) {
        color = '#338bff'
      } else {
        color = '#ff7656'
      }
      return `${width}background:${color}`
    }
  }
}
</script>
<style>
.line-degree{position: relative; width: 589rpx;}
.line-degree .lomo_hint{color: #338bff;}
.line-degree .degree{position:absolute; top: 15rpx; left: 131rpx; width: 347rpx; height: 15rpx; background: #dbdbdb;border-radius: 8rpx;}
.line-degree .rate{height: 15rpx; background: #338bff;border-radius: 8rpx;}
.line-degree .per{position: absolute;top: 0; right: 0;line-height: 1;}
</style>
