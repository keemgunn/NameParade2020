<template>
  <div class="app" :class="{'ALL-LOADED':(LOADING_PROGRESS >= 1)}">
    <Background/>
    <div id="content">
      <Loader/>
      <TitleSign/>
      




      <Pathmaker/>

      <test v-if="test.modal"/>
    </div>
  </div>
</template>

<script> 
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
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
    ...mapState(['test', 'winSize', 'loading']),
    ...mapGetters(['byType','FILES_IN_SERVER', 'FILES_LOADED', 'LOADING_PROGRESS'])
  },
  methods: {
    ...mapMutations(['START_SIGNLOAD', 'setBBC', 'UPDATE_SIGNS']),
    ...mapActions(['INITIATE']),
    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },
  },
  watch: {
    LOADING_PROGRESS(nu, old) {
      this.loading.justLoaded = nu - old;
      if(nu >= 1){
        document.querySelector('body').style.overflow = 'auto';
      }
    },
    FILES_IN_SERVER(nu, old){ //--trigger
      if(this.loading.processing === 0){
        console.log('--- initiating SIGNLOAD process ---');
        console.log('filesInServer:', nu);
        this.loading.processing = 1;
        this.START_SIGNLOAD();
      }else if(this.loading.processing === 1){
        console.log('loading is already processsing');

      }else{ // === 2
        console.log('file index update');
        console.log('from:', old, ' / to:', nu);

      }


    }
  },
  created() {
    this.onResize();
    this.setBBC({comp:-1, hue:-1});
    this.INITIATE();
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
