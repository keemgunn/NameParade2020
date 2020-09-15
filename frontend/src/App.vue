<template>
  <div id="app">

    
    <Background 
    
    />


    <div id="content">
      <br><br>
      vw: {{vw}} <br>
      vh: {{vh}} <br>
      {{txt}} <br><br>
      - msg said - <br> {{msg}}

      
    </div>
  </div>
</template>

<script> 
import Background from './components/Background'

export default {
  name: 'App',
  components: {
    Background
  },
  data() {
    return {
      vh: window.innerHeight,
      vw: window.innerWidth,
      txt: '',
      msg: ''
    }
  },
  watch: {
    vh(newHeight, oldHeight) {
     this.txt = `it changed to ${newHeight} from ${oldHeight}`;
    },
    vw(newWidth, oldWidth) {
     this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    document.documentElement.addEventListener('touchstart', this.preventPinch, false);

  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {  
    onResize() {
      this.vh = window.innerHeight
      this.vw = window.innerWidth
    },
    preventPinch(event) {
      this.msg = event.touches.length
      if (event.touches.length > 1) { 
        event.preventDefault(); 
      }
    }
  }
}
</script>


<style lang="scss">
  body {
    position: fixed; top: 0; left: 0; 
    padding: 0; margin: 0;
    overflow: hidden;
    background-color: black;
  }
  #app {
    z-index: 0;
    position: absolute; top: 0; left: 0;
    margin: 0; padding: 0;
    width: 100vw; height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: aliceblue;
    background-color: black;
  }
  #content {
    z-index: 0;
    position: absolute; top: 0; left: 0;
    margin: 0; padding: 0;
    width: 100vw; height: 100vh;
  }
  



</style>
