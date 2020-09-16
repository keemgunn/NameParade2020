<template>
  <div class="app" :class="{'ALL-LOADED':(LOADING_PROGRESS === 1)}">
    <Background/>

    <div id="content">
    <div class="content" :class="byType">
      <Loader/>


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
    ...mapGetters(['byType', 'LOADING_PROGRESS'])
  },
  methods: {
    ...mapMutations(['setBBC']),
    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },
    progressDone(){
      this.$store.state.loading.filesLoaded = 100;
    }
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
    this.onResize();
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
  .app {
    z-index: 0;
    position: absolute; top: 0; left: 0;
    margin: 0; padding: 0;
    width: 100vw; height: 80vh;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: aliceblue;
  }.ALL-LOADED {
    transition: 300ms;
    height: 100vh;
    overflow-x: hidden; overflow-y: auto;
    background-color: aqua;
  }



  #content{
    .content {
      z-index: 0;
      position: absolute; top: 0; left: 0;
      width: 100vw; height: 100vh;
      
      margin: 0; padding: 0;
      // background-color: darkslategrey;
    }
    ._small {
      width: 100vw; height: 300vh;
      // background-color: rgba(235, 147, 16, 0.61);
    }
    ._narrow {
      width: 100vw; height: 300vh;
      // background-color: rgba(211, 55, 76, 0.61);
    }
    ._tablet {
      width: 100vw; height: 300vh;
      // background-color: rgba(20, 167, 235, 0.562);
    }
    ._wide {
      width: 100vw; height: 100vh;
      // background-color: rgba(58, 19, 233, 0.616);
    }

  }





  #test {
  position: absolute; top: 0%; left: 0%;
  width: 100px; height: fit-content;
  }



</style>
