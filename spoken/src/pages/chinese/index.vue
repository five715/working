<template>
  <div class="container" >
    <div class="message">{{ msg }}</div>
    
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

