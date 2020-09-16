<template>
  <div class="app" :class="{'ALL-LOADED':(LOADING_PROGRESS >= 1)}">
    <Background/>
    <div id="content">
      <Loader/>
      <TitleSign/>
      




      <Pathmaker/>

      <test v-if="testModal"/>
    </div>
  </div>
</template>

<script> 
import { mapState, mapGetters, mapMutations } from 'vuex';
import test from './test'
import Background from './components/Background';
import Loader from './components/Loader';
import TitleSign from './components/TitleSign'

import Pathmaker from './components/writer/Pathmaker'


export default {
  name: 'App',
  components: {
    test,
    Background,
    Loader,
    TitleSign,

    Pathmaker
  },
  computed: {
    ...mapState(['test', 'testModal', 'winSize', 'loading']),
    ...mapGetters(['byType', 'LOADING_PROGRESS'])
  },
  methods: {
    ...mapMutations(['setBBC']),
    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },
  },
  watch: {
    LOADING_PROGRESS(new0, old0) {
      this.loading.justLoaded = new0 - old0;
      if(new0 >= 1){
        document.querySelector('body').style.overflow = 'auto';
      }
    },
  },
  created() {
    this.onResize();
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


</style>
