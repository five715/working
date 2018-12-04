<template>
    <div class="high-light">
        <div class="h">{{hint}}</div>
        <span v-for="(word,index) in words" :key="index">{{word}}</span>
    </div>
</template>

<script>
export default {
  props: {
    initHint: {
      type: String,
      default: '单词错误'
    },
    initWords: {
      type: Array,
      default: ['无']
    }
  },
  data () {
    return {
      hint: this.initHint,
      words: this.initWords
    }
  }
}
</script>

<style>
.high-light{position: relative;font-size: 34rpx;margin:30rpx 0; width: 100%;}
.high-light .h{color: #888888; margin: 10rpx 0;}
.high-light span{ margin-right: 20rpx; display: inline-block;}
</style>
