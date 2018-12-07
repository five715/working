<template>
  <a class="index-boxes" hover-class="none" :href="href">
    <img class="boxes_ioc" :src="src" alt="">
    <text class="boxes_text">{{text}}</text>
  </a>
</template>

<script>
export default {
  props: {
    initSrc: {
      type: String,
      default: ''
    },
    initHref: {
      type: String,
      default: ''
    },
    initText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      src: this.initSrc,
      href: this.initHref,
      text: this.initText
    }
  }
}
</script>

<style>
.container{height: 1334rpx;position:fixed;top: 0}
.index-boxes{background: #ffffff;width: 249rpx;height: 195rpx;position: relative; border: 1px solid #dbdbdb; float: left; margin: -1rpx 0 0 -1rpx;}
.index-boxes .boxes_ioc{width: 70rpx;height: 70rpx;top: 40rpx;left: 90rpx;position: absolute;}
.index-boxes .boxes_text{width: 100%;top: 130rpx;left: 0;position: absolute;text-align: center; font-size: 30rpx;}
</style>
