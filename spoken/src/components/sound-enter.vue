<template>
  <div class="sound-enter">
    <btnAudio ref="btnAudio"/>
    <div class="btn_record">
      <btnRecord  @setSrc="bindSetSrc"/>
    </div>
    <a v-if="look" :href="href"><img src="/static/ioc_look.png" class="look" alt=""></a>
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
    },
    initLook: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      src: this.initSrc,
      href: this.initHref,
      look: this.initLook
    }
  },
  methods: {
    bindSetSrc (e) {
      this.$refs.btnAudio.src = e.src
    }
  }
}
</script>
<style>
.sound-enter{position:absolute;top: 905rpx;left: 40rpx;width: 509rpx; height: 129rpx;}
.sound-enter .btn_record{position:absolute; top: 0rpx; left: 137rpx;}
.sound-enter .look{position:absolute; top: 5rpx; left: auto; right: 0rpx; width: 80rpx; height: 124rpx;}
</style>

