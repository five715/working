<template>
  <div class="popup-toast">
    <img v-show="isPop == 3" class="toast" src="/static/record_time.png" alt>
    <img v-show="isPop == 1" class="toast" src="/static/record_mic.png" alt>
    <img v-show="isPop == 2" class="toast" src="/static/record_close.png" alt>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPop: 0
    }
  },
  created () {
    var that = this
    that.Global.isPop = function (n) {
      that.isPop = n
    }
    console.log(that.Global)
  }
}
</script>
<style>
.popup-toast{
  position: relative;
}
.popup-toast .toast {
  width: 260rpx;
  height: 260rpx;
  position: fixed;
  top: 428rpx;
  left: 245rpx;
}
</style>
