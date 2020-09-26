<template>
  <div class="app">
    <Background/>
    <div id="content">
      <Title/>
      <Writer v-if="(SEQ === 2) || (SEQ === 3)"/>
      <Parade v-if="SEQ > 3" />
    


      <test v-if="test.modal"/>
    </div>
  </div>
</template>

<script> 
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
// let State, Getters, Mutations, Actions;
import test from './test/test.vue'
import Background from './components/Background';
import Title from './components/Title';
import Writer from './components/Writer';
import Parade from './components/Parade';

// console.log(Reflect.ownKeys(this.$store.getters));

export default {
  name: 'App',
  components: {
    test,
    Background,
    Title,
    Writer,
    Parade

  },
  computed: {
    ...mapState([
        'test', 
        'winSize',
      ]),
    ...mapGetters([
        'TC', 'TS',
        'byType', 
        'SEQ', 
        'FILES_IN_SERVER',
        'SIGN_SENT',

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
      if(this.TC.signLoadDone){
        console.log('--- test: start loading signs ---');
        this.startSignLoad();
      }else{
        if(this.SEQ === 0){
          if(nu.length){
            console.log('--- start loading signs ---');
            console.log('filesInServer:', nu.length);
            this.startSignLoad();
          }else{
            console.log('--- no sign data ---');
            console.log('filesInServer:', nu.length);
          }
        }else{ // > 0
          console.log('file index update to:', nu.length);
          return old
        }
      }
    },
    SIGN_SENT(nu, old){
      if(nu === true){
        if(this.TC.testSequence){
          this.$store.state.test.client.sequenceNow = 4;
        }else{
          this.moveTo(4);
        }
      }else{
        return old
      }
    }
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
