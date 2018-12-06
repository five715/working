<template>
  <div class="container" >
    <div class="defined_boxes">
      <textarea name="text" id="text" cols="30" rows="10" placeholder="输入需要测评的英语单词或者句子，以换行为间隔"></textarea>
      <div class="select">
        <div class="select_hint">口语评判标准</div>
        <img class="select_arrow" src="/static/ioc_arrow_bot.png" alt="">
        <div v-for="(option,o) in options" :key="o" :id="o" class="option" :style="o==0?'color:#338bff':''" @click="onClickSelect">{{option}}</div>
      </div>
    </div>
    <div class="defined_hint">输入测评内容后，选择评判标准，按住下方录音即可开始评测。</div>
    <div class="defined_record"><btnRecord/></div>
  </div>
</template>

<script>
import btnRecord from '@/components/btn-record'
export default {
  components: {
    btnRecord
  },
  data () {
    return {
      options: ['成人'],
      selects: ['成人', '儿童']
    }
  },
  methods: {
    onClickSelect (e) {
      var id = e.target.id
      var options = this.options
      var selects = this.selects
      if (id === '0' && options.length === 1) {
        this.options = options.concat(this.arrayRemove(selects, options[id]))
      } else {
        this.options = []
        this.options.push(options[id])
      }
    },
    arrayRemove (arr, str) {
      var newArr = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== str) newArr.push(arr[i])
      }
      return newArr
    }
  }

}
</script>

<style>
.container{height: 1334rpx;position: fixed;}
.defined_boxes{position: relative; margin: 40rpx;border-radius: 10rpx;border: 1px solid #d3d3d3;background: #ffffff;}
.defined_boxes textarea{width:587rpx;height: 575rpx;margin: 40rpx;font-size: 26rpx;line-height: 40rpx;}
.defined_boxes .select{position: relative;}
.defined_boxes .option{text-align: right;line-height: 90rpx;font-size: 34rpx;width: 100%;height: 90rpx;border-top: 1px solid #dbdbdb;padding-right: 70rpx;box-sizing:border-box}
.defined_boxes .select_hint{position: absolute; top: 0;left: 40rpx;font-size:34rpx;line-height: 90rpx;}
.defined_boxes .select_arrow{position: absolute;top: 42rpx;right: 34rpx;width: 26rpx;height: 14rpx;}
.defined_record{position: absolute;top: 1007rpx; left: 258rpx;width: 230rpx; height: 90rpx;}
.defined_hint{width: 100%;padding: 0 40rpx; font-size: 26rpx; color: #888888; box-sizing: border-box;}

</style>
