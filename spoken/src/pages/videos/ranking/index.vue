<template>
  <div class="container" >
    <div class="lomo">
      <div class="lomo_hint">我的排名</div>
      <li-ranking :init-head="my.head" :init-number="my.number" :init-name="my.name" :init-score="my.score" :init-type="3"/>
    </div>
    <div class="lomo">
      <div class="lomo_hint">全部排名</div>
      <li-ranking v-for="(rank,index) in ranking" :key="index" :init-number="index+1" :init-type="2" :init-head="rank.head" :init-name="rank.name" :init-score="rank.score"/>
    </div>
  </div>
</template>

<script>
import liRanking from '@/components/li-ranking'
export default {
  components: {
    liRanking
  },
  data () {
    return {
      my: {
        head: '/static/ioc_ranking_head_1.png',
        name: '小鱼',
        score: 98,
        number: 1
      },
      ranking: [
        {
          head: '/static/ioc_ranking_head_1.png',
          name: '小鱼',
          score: 98
        },
        {
          head: '/static/ioc_ranking_head_2.png',
          name: '在哪跌倒就在哪躺下',
          score: 97
        },
        {
          head: '/static/ioc_ranking_head_3.png',
          name: '可可妈',
          score: 96
        },
        {
          head: '/static/ioc_ranking_head_1.png',
          name: '小鱼',
          score: 98
        },
        {
          head: '/static/ioc_ranking_head_2.png',
          name: '在哪跌倒就在哪躺下',
          score: 97
        },
        {
          head: '/static/ioc_ranking_head_3.png',
          name: '可可妈',
          score: 96
        },
        {
          head: '/static/ioc_ranking_head_1.png',
          name: '小鱼',
          score: 98
        },
        {
          head: '/static/ioc_ranking_head_2.png',
          name: '在哪跌倒就在哪躺下',
          score: 97
        },
        {
          head: '/static/ioc_ranking_head_3.png',
          name: '可可妈',
          score: 96
        }
      ]
    }
  }
}
</script>

<style>
.container{position: relative;}
.lomo{border: 1px solid #d3d3d3; width: 670rpx;box-sizing: border-box; margin: 40rpx; padding: 40rpx;position: relative;
  border-radius: 10rpx;}
.lomo_hint{font-size: 34rpx;color: #888888;}
.score_text{text-align: center;width: 100%;font-size: 100rpx;line-height: 1;}
.score{color: #338bff;}

</style>
