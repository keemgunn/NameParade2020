<template>
  <div class="app">
    <Background/>
    <div id="content">
      <Loader/>
      <TitleSign v-if="1"/>
      <Writer v-if="SEQ > 1"/>

    
      <Pathmaker v-if="0"/>

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
import Writer from './components/Writer'

import Pathmaker from './components/writer/Pathmaker'


export default {
  name: 'App',
  components: {
    test,
    Background,
    Loader,
    TitleSign,
    Writer,

    Pathmaker
  },
  computed: {
    ...mapState([
        'test', 
        'winSize', 
      ]),
    ...mapGetters([
        'byType', 
        'SEQ', 
        'FILES_IN_SERVER',
      ])
  },
  methods: {
    ...mapMutations([
        'moveTo', 
        'setBBC', 
      ]),
    ...mapActions([
        'INITIATE', 
        'startSignLoad'
      ]),
    onResize() {
      this.winSize.vw = window.innerWidth
      this.winSize.vh = window.innerHeight
    },
  },
  watch: {
    SEQ(nu, old) {
      console.log('-- sequence changed :', old,'->',nu);
      console.log('-- SEQ:', this.$store.state.seqName);
      if(nu > 3){
        document.querySelector( 'body' ).style['overflow-y'] = 'auto';
        document.querySelector( 'body' ).style['overflow-x'] = 'hidden';
      }
    },
    FILES_IN_SERVER(nu, old){
      if(this.SEQ === 0){
        console.log('--- start loading signs ---');
        console.log('filesInServer:', nu);
        this.startSignLoad();
      }else{ // > 0
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
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    if(this.SEQ > 3){
      document.querySelector( 'body' ).style['overflow-y'] = 'auto';
      document.querySelector( 'body' ).style['overflow-x'] = 'hidden';
    }
    // document.documentElement.addEventListener('touchstart', this.preventPinch, false);
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>


<style lang="scss">
  @import "assets/styles/animations.scss";
  @import "assets/fonts/CoreGothicD/coregothicd.css";

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
