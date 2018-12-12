<template>
  <div v-if="type==1" class="line-degree">
    <div class="lomo_hint">{{hint}}</div>
    <div class="degree">
      <div class="line_degree_rate" :style="countPer"></div>
    </div>
    <div class="per">{{per}}%</div>
  </div>
  <div v-else-if="type==2" class="line-degree line-degree-type-2">
    <div class="degree">
      <div class="line_degree_rate" :style="countPer"></div>
    </div>
    <div class="per">{{time}}s</div>
  </div>
</template>
<script>
export default {
  props: {
    initHint: {
      type: String,
      default: ''
    },
    initPer: {
      type: Number,
      default: 0
    },
    initType: {
      type: Number,
      default: 1
    },
    initTime: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      per: this.initPer,
      hint: this.initHint,
      type: this.initType,
      time: this.initTime
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
      // color = `rgb(${parseInt(255 * per / 100)},118,${255 - parseInt(255 * per / 100)})`
      return `${width}background:${color}`
    }
  }
}
</script>
<style>
.line-degree{position: relative; width: 589rpx;}
.line-degree .lomo_hint{color: #338bff;}
.line-degree .degree{position:absolute; top: 15rpx; left: 131rpx; width: 347rpx; height: 15rpx; background: #dbdbdb;border-radius: 8rpx;}
.line-degree .line_degree_rate{height: 15rpx; background: #338bff;border-radius: 8rpx;}
.line-degree .per{position: absolute;top: 0; right: 0;line-height: 1;}

.line-degree-type-2 {width: 320rpx;}
.line-degree-type-2 .degree{left: 0;width: 270rpx;}
.line-degree .per{font-size: 26rpx; top: 10rpx;}


</style>
