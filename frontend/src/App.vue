<template>
  <div id="app">

    
    <Background 
    />


    
   

    


    <div id="content">
      <br><br>
      vw: {{winSize.vw}} <br>
      vh: {{winSize.vh}} <br>
      {{watchWindowSize}} <br><br>
      - msg said - <br> {{msg}}

      <div id="test">
        <button @click="newBBC()">test A</button><br>
        <button>test B</button><br>
        <button>test C</button><br>
        <button>test D</button><br>
      </div>
      
    </div>
  </div>
</template>

<script> 
import { mapState, mapMutations } from 'vuex';
import Background from './components/Background';


export default {
  name: 'App',
  components: {
    Background
  },
  data() {
    return {
      watchWindowSize: '',
      msg: ''
    }
  },
  computed: {
    ...mapState(['winSize'])
  },
  methods: {
    ...mapMutations(['newBBC']),
    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },

  },
  watch: {
    vh(newHeight, oldHeight) {
     this.watchWindowSize = `it changed to ${newHeight} from ${oldHeight}`;
    },
    vw(newWidth, oldWidth) {
     this.watchWindowSize = `it changed to ${newWidth} from ${oldWidth}`;
    }
  },
  created() {
    this.winSize.vw = window.innerWidth;
    this.winSize.vh = window.innerHeight;
  },
  mounted() {
    // document.documentElement.addEventListener('touchstart', this.preventPinch, false);
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })

  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
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


  #test {
  position: absolute; top: 41%; left: 41%;
  width: 100px; height: 100px;
  background-color: black;
  }#test:hover {
    cursor: pointer;
    background-color: darkviolet;
  }



</style>
