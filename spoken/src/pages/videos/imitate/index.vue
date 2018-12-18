<template>
  <div class="container" >
    <div class="lomo">
      <div class="lomo_hint">本次得分</div>
      <div class="hintDot">
        <div class="pink dots">
          <img class="dot" src="/static/ioc_dot_pink.png">
          <div class="text">发音错误</div>
        </div>
        <div class="orange dots">
          <img class="dot" src="/static/ioc_dot_orange.png">
          <div class="text">发音漏读</div>
        </div>
      </div>
      <div class="score_text score">{{score}}</div>
      <div class="line"></div>
      <div class="play">
        <btnAudio :init-src="src" :init-type="3"/>
      </div>
      <ul class="score_li">
        <li v-for="(li,i) in lis" :key="i">
          {{i+1}}. <span v-for="(span,s) in li" :key="s" :style="s%2==0?'':'color:red'">{{span}}</span>
        </li>
      </ul>
    </div>
    <div class="lomo">
      <div class="lomo_hint">排行榜</div>
      <li-ranking v-for="(rank,index) in ranking" :key="index" :init-number="index+1" :init-head="rank.head" :init-name="rank.name" :init-score="rank.score"/>
      <div class="line" style="margin: 50rpx 0.5rpx 35rpx 0.5rpx;"></div>
      <a hover-class="none" class="more" href="/pages/videos/ranking/main">查看更多</a>
    </div>
    <div v-if="isDegrees">
      <div class="lomo"  v-for="(degree,d) in degrees" :key="d">
      <line-degree :init-hint="degree.hint" :init-per="degree.per"/>
      <high-light v-for="(high,h) in degree.highLight" :key="h" :init-hint="high.hint" :init-words="high.words"/>
      <div class="susmmary" v-if="degree.susmmary">
        平均语速<span>{{degree.susmmary[0]}}</span>，停顿时间过长次数<span>{{degree.susmmary[1]}}</span>次
      </div>
      </div>
    </div>
    <div class="lomo" v-else >
      <block v-for="(degree,g) in degreesList" :key="g">
        <line-degree :init-hint="degree.hint" :init-per="degree.per"/>
        <high-light v-for="(high,h) in degree.highLight" :key="h" :init-hint="high.hint" :init-words="high.words"/>
        <div class="susmmary" v-if="degree.susmmary">
          平均语速<span>{{degree.susmmary[0]}}</span>，停顿时间过长次数<span>{{degree.susmmary[1]}}</span>次
        </div>
      </block>
    </div>
  </div>
</template>

<script>
import btnAudio from '@/components/btn-audio'
import liRanking from '@/components/li-ranking'
import lineDegree from '@/components/line-degree'
import highLight from '@/components/high-light'
export default {
  components: {
    liRanking,
    lineDegree,
    highLight,
    btnAudio
  },
  data () {
    return {
      score: 98,
      isDegrees: true,
      src: 'http://qq.vogso.com/yili/qiaolezi2018/wap/sounds/sound_3.mp3',
      lis: [
        ['The outside world is ', 'scary', ', but dad will always be there to protect you.'],
        ["Dad, I won't go out again."],
        ["It's daddy's ", 'sweetheart', '.']
      ],
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
        }
      ],
      degrees: [
        {
          hint: '准确度',
          per: 98,
          highLight: [
            {
              hint: '单次错误',
              words: ['scary', 'sweetheart']
            }
          ]
        },
        {
          hint: '完整度',
          per: 100,
          highLight: [
            {
              hint: '遗漏词汇',
              words: ['scary', 'sweetheart']
            },
            {
              hint: '多度词汇',
              words: ['无']
            }
          ]
        },
        {
          hint: '流利度',
          per: 60,
          susmmary: ['慢', 1]
        }
      ],
      degreesList: [
        {
          hint: '准确度',
          per: 98
        },
        {
          hint: '完整度',
          per: 100
        },
        {
          hint: '流利度',
          per: 60,
          susmmary: ['慢', 1]
        }
      ]
    }
  },
  onLoad (e) {
    this.isDegrees = !e.degrees
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
.container{position: relative; height: auto;padding-bottom: 1rpx;}
.lomo{border: 1px solid #d3d3d3; width: 670rpx;box-sizing: border-box; margin: 40rpx; padding: 40rpx;position: relative;
  border-radius: 10rpx}
.lomo_hint{font-size: 34rpx;color: #888888;}
.score_text{text-align: center;width: 100%;font-size: 100rpx;line-height: 1;margin-top: 50rpx;}
.score{color: #338bff;}
.line{width: 589rpx; height: 2rpx; background: #dbdbdb; margin: 81rpx 0.5rpx;}
.play{width: 80rpx;height: 80rpx;position: absolute;top: 276rpx; left: 295rpx;}
.score_li li{font-size: 34rpx;}
.more{text-align: center; color: #338bff;font-size: 26rpx;}
.susmmary{font-size: 34rpx; color: #888888;margin:30rpx 0; }
.susmmary span{color: #000000;margin: 0 0.3em;}

.lomo .hintDot{position: absolute;top: 36rpx; left: 460rpx;width: 180rpx;color:#888888;}
.lomo .hintDot .dots{position: relative; height: 30rpx; margin: 10rpx;}
.lomo .hintDot .dots .dot{width:30rpx;height: 30rpx; position: absolute;top: 0;left:0}
.lomo .hintDot .dots .text{font-size:26rpx;top: 0;left:40rpx;position: absolute;line-height: 1;}
</style>
