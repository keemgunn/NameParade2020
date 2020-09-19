<template>
  <div class="app">
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
    ...mapState(['test', 'winSize', 'loading', 'loadedArr']),
    ...mapGetters(['byType', 'MODAL', 'FILES_IN_SERVER', 'LOADING_PROGRESS'])
  },
  methods: {
    ...mapMutations(['setBBC', 'pushToSIGNS', 'UPDATE_SIGNS']),
    ...mapActions(['INITIATE', 'startSignLoad']),
    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },
    follows(MODAL){
      if(MODAL === 0){
        return {
          'transition': '300ms',
          'overflow': 'hidden'
        }
      }else if(MODAL === 1){
        return {
          'transition': '300ms',
          'overflow-x': 'hidden', 
          'overflow-y': 'auto'
        }
      }else if(MODAL === 2){
        return {
          'transition': '300ms',
          'overflow-x': 'hidden', 
          'overflow-y': 'auto'
        }
      }else if(MODAL === 3){
        return {
          'transition': '300ms',
          'overflow-x': 'hidden', 
          'overflow-y': 'auto'
        }
      }
    }
  },
  watch: {
    MODAL(nu, old) {
      console.log('modal change :', old, nu);
      if(nu > 1){
        document.querySelector('body').style.overflow = 'auto';
      }
    },
    FILES_IN_SERVER(nu, old){
      if(this.loading.processing === 0){
        console.log('--- start loading signs ---');
        console.log('filesInServer:', nu);
        this.loading.processing = 1;
        this.startSignLoad();
      }else if(this.loading.processing === 1){
        console.log('loading is already processsing');
      }else{ // === 2
        console.log('file index update');
        console.log('from:', old, ' / to:', nu);
      }
    },
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
    if(this.MODAL > 1){
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: aliceblue;
  }

  #content{
    z-index: 0;
    position: relative; top: 0; left: 0;      
    margin: 0; padding: 0;
    width: 100%; height: 100%;
  }


</style>
