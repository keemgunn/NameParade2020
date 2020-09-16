<template>
  <div class="app" :class="{'ALL-LOADED':(LOADING_PROGRESS >= 1)}">
    <Background/>
    <div id="content">
      <Loader/>


      <div id="test">
        vw: {{winSize.vw}} <br>
        vh: {{winSize.vh}} <br>
        loadedAmount: {{loadedAmount}}
        - msg said - <br> {{msg}}
        <button @click="setBBC({comp:-1, hue:-1})">test A</button><br>
        <button @click="setBBC({comp:1, hue:3})">test B</button><br>
        <button @click="progressDone()">test C</button><br>
        <button>test D</button><br>
      </div>





    </div>
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
      loadedAmount: '',
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
      this.$store.state.loading.filesLoaded += 1;
    }
  },
  watch: {
    LOADING_PROGRESS(new0, old0) {
      this.loadedAmount = new0 - old0;
      if(new0 >= 1){
        document.querySelector('body').style.overflow = 'auto';
      }
    },
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
    if(this.LOADING_PROGRESS >= 1){
      document.querySelector( 'body' ).style.overflow = 'auto';
    }
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>


<style lang="scss">
  $appHeight: 300vh;


  body {
    overflow: hidden;
    background-color: black;
  }

  .app {
    z-index: 0;
    position: absolute; top: 0; left: 0;
    margin: 0; padding: 0;
    width: 100vw; height: $appHeight;
    // overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: aliceblue;
  }.ALL-LOADED {
    transition: 300ms;
    overflow-x: hidden; overflow-y: auto;
  }

  #content{
    z-index: 0;
    position: relative; top: 0; left: 0;      
    margin: 0; padding: 0;
    width: 100%; height: 100%;
  }

  #test {
  position: absolute; top: 0%; left: 0%;
  width: 100px; height: fit-content;
  }
  
</style>
