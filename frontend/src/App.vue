<template>
  <div id="app">




    <Contents />




  </div>
</template>

<script>
import Contents from '@/components/Contents'

export default {
  name: 'App',
  components: {
    Contents,
  }
}
</script>


<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }
  
</style>
