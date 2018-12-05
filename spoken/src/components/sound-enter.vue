<template>
  <div class="sound-enter">
    <btnAudio :init-src="src"/>
    <div class="btn_record">
      <btnRecord/>
    </div>
    <a :href="href"><img src="/static/ioc_look.png" class="look" alt=""></a>
  </div>
</template>

<script>
import btnAudio from '@/components/btn-audio'
import btnRecord from '@/components/btn-record'
export default {
  components: {
    btnRecord,
    btnAudio
  },
  props: {
    initSrc: {
      type: String,
      default: ''
    },
    initHref: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      src: this.initSrc,
      href: this.initHref
    }
  }
}
</script>
<style>
.sound-enter{position:absolute;top: 905rpx;left: 40rpx;width: 509rpx; height: 129rpx;}
.sound-enter .btn_record{position:absolute; top: 0rpx; left: 137rpx;}
.sound-enter .look{position:absolute; top: 5rpx; left: auto; right: 0rpx; width: 80rpx; height: 124rpx;}
</style>

