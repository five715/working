<template>
  <div v-if="type==1" class="li-ranking">
    <span class="number">{{number}}</span>
    <img class="head" :src=head alt="">
    <span class="name">{{name}}</span>
    <span class="score">{{score}}</span>
  </div>
  <div v-else-if="type==2" class=".li-ranking li-ranking_type_2">
    <img class="head" :src=head alt="">
    <span class="name">{{name}}</span>
    <img class="medal" src="/static/ioc_medal.png" alt="">
    <span class="score">{{score}}</span>
  </div>
  <div v-else class=".li-ranking li-ranking_type_3">
    <img class="head" :src=head alt="">
    <span class="name">{{name}}</span>
    <img class="medal" src="/static/ioc_medal.png" alt="">
    <span class="score">{{score}}</span>
    <img class="rank" :style="countRank" src="/static/ioc_ranking.png" alt="">
    <span class="number">{{number}}</span>
  </div>
</template>
<script>
export default {
  props: {
    initNumber: {
      type: Number,
      default: 1
    },
    initHead: {
      type: String,
      default: '/static/ioc_ranking_head.png'
    },
    initName: {
      type: Number,
      default: 11
    },
    initScore: {
      type: Number,
      default: 98
    },
    initType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.initNumber,
      head: this.initHead,
      name: this.initName,
      score: this.initScore,
      type: this.initType
    }
  },
  computed: {
    countRank () {
      if (this.number < 10) {
        return 'left: 510rpx;'
      } else if (this.number < 100) {
        return 'left: 495rpx;'
      } else {
        return 'left: 480rpx;'
      }
    }
  }
}
</script>
<style>
.li-ranking{position: relative; width: 100%; height: 100rpx; margin: 40rpx 0 0 0;}
.li-ranking span{line-height: 100rpx;}
.li-ranking .number{position: absolute;top: 0rpx;left: 0rpx;}
.li-ranking .head{position: absolute;top: 0rpx;left: 40rpx;width: 100rpx;height: 100rpx;}
.li-ranking .name{position: absolute;top: 0rpx;left: 170rpx;}
.li-ranking .score{position: absolute;top: 0rpx;right: 0;}

.li-ranking_type_2 .head{left: 0}
.li-ranking_type_2 .name{left: 130rpx;}
.li-ranking_type_2 .medal{position: absolute;top: 29.5rpx;left: 495rpx;width: 36rpx;height:41rpx;}
.li-ranking_type_2 .score{color: #000;}

.li-ranking_type_3 .head{left: 0}
.li-ranking_type_3 .name{left: 130rpx;}
.li-ranking_type_3 .medal{position: absolute;top: 29.5rpx;left: 375rpx;width: 36rpx;height:41rpx;}
.li-ranking_type_3 .score{color: #000;right: 120rpx;}
.li-ranking_type_3 .rank{position: absolute;top: 31.5rpx;left: 480rpx;width: 38rpx;height:37rpx;}
.li-ranking_type_3 .number{left:auto;right: 0;}


</style>
