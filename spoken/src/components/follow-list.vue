<template>
  <div class="follow-list">
    <img :src="pic" alt="" class="follow_list_pic">
    <div class="follow_list_title">{{title}}</div>
    <div class="follow_list_geade">难度
      <img class="follow_list_star" v-for="(s,n) in star" :key="n" :src="'/static/ioc_star_'+s+'.png'" alt="" srcset="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initTitle: {
      type: String,
      default: ''
    },
    initPic: {
      type: String,
      default: ''
    },
    initGrade: {
      type: Number,
      default: 3
    }
  },
  computed: {
    star () {
      var arr = []
      for (var i = 0; i < 5; i++) {
        if (i < this.grade) {
          arr.push('yes')
        } else {
          arr.push('no')
        }
      }
      return arr
    }
  },
  data () {
    return {
      title: this.initTitle,
      pic: this.initPic,
      grade: this.initGrade
    }
  }
}
</script>

<style>
.follow-list{position:relative;width: 710rpx;height:208rpx; border-bottom: 1px solid #dbdbdb;margin-left: 40rpx;background: #ffffff}
.follow-list .follow_list_pic{width: 128rpx;height: 128rpx;position:absolute;top: 40rpx;left: 0;}
.follow-list .follow_list_title{position:absolute;top: 40rpx;left: 158rpx;font-size: 34rpx;width: 508rpx;}
.follow-list .follow_list_geade{position: absolute;top: 143rpx; left: 158rpx;font-size: 26rpx;color: #888888;}
.follow-list .follow_list_star{width: 27rpx;height: 26rpx;margin: 0 5rpx;}
.follow-list .follow_list_title{
  text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box; 
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
