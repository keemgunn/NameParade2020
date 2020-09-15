<template>
  <div id="app">

    
    <Background/>

    <Loader/>
    
   

    

    <div id="content">
    <div class="content" :class="byType">
      <br><br><br><br><br><br>
      {{byType}}



      <div id="test">
        vw: {{winSize.vw}} <br>
        vh: {{winSize.vh}} <br>
        {{watchWindowSize}} <br><br>
        - msg said - <br> {{msg}}
        <button @click="setBBC({comp:-1, hue:-1})">test A</button><br>
        <button @click="setBBC({comp:1, hue:3})">test B</button><br>
        <button>test C</button><br>
        <button>test D</button><br>
      </div>

    </div></div>

  </div>
</template>

<script> 
import { mapState, mapGetters, mapMutations } from 'vuex';
import Background from './components/Background';
import Loader from './components/Loader';


export default {
  name: 'App',
  components: {
    Background,
    Loader
  },
  data() {
    return {
      watchWindowSize: '',
      msg: ''
    }
  },
  computed: {
    ...mapState(['winSize']),
    ...mapGetters(['byType'])
  },
  methods: {
    ...mapMutations(['setBBC']),
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
    this.setBBC({comp:-1, hue:-1});
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

  #content{
    .content {
      z-index: 0;
      position: absolute; top: 0; left: 0;
      margin: 0; padding: 0;
      width: 100vw; height: 85vh;
      // background-color: darkslategrey;
    }
    ._small {
      // background-color: rgb(235, 147, 16);
    }
    ._narrow {
      // background-color: rgb(211, 55, 76);
    }
    ._tablet {
      // background-color: rgb(20, 167, 235);
    }
    ._wide {
      // background-color: rgb(58, 19, 233);
    }


  }





  #test {
  position: absolute; bottom: 0%; right: 0%;
  width: 100px; height: fit-content;
  }



</style>
