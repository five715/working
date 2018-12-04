<template>
  <div class="container" >
    <a href="/pages/lesson/main">课文评测</a>
    <a href="/pages/videos/index/main">视频模仿</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world'
    }
  },
  onLoad () {
    console.log('onLoad')
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
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
</style>

