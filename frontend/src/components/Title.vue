<template>
<div class="title-space" :style="space">
<div class="block-wrapper" :style="FIELD">
  <div v-for="block in blocks" :key="block">
    <div class="cell" :style="cellStyle">
      <Cell 
        :block="block" 
        :index="blocks.indexOf(block)"
        :allMounted="CELL_TIMING.allMounted"
        @mounted='$store.state.cellTiming.mounted += 1'
      />
    </div>
  </div>
</div>
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
// import anime from 'animejs';
// const an = require('../assets/javascripts/circleAnime');
import Cell from './title/Cell';

const name = "Title";
export default {
  name,
  components: { Cell, },
  data() { return {
  }},
  computed: {
    ...mapState([ 
        'winSize',
        'aniTiming',
        'blocks'
      ]),
    ...mapGetters([ 
        'VIEWTYPE', 
        'byType', 
        'SEQ',
        'bs',
        'fw',
        'fh',
        'wOff',
        'hOff',
        'blockCounts',
        'CELL_TIMING',
        'CELL_MOUNTED'

      ]),
      AT: function(){
        return this['aniTiming'][name]
      },
    space: function(){
      if(this.SEQ === 0){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '46vh',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '46vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '50vh',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '50vh',
          }
        }
      }else if(this.SEQ === 1){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '38vh',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '38vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '40vh',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '40vh',
          }
        }
      }else if(this.SEQ === 2){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '22vw',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '22vw',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '20vw',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '5vw',
          }
        }
      }else if(this.SEQ > 2){
        if(this.VIEWTYPE === 'small'){
          return {
            'height': '12vw',
          }
        }else if(this.VIEWTYPE === 'narrow'){
          return {
            'height': '12vh',
          }
        }else if(this.VIEWTYPE === 'tablet'){
          return {
            'height': '20vw',
          }
        }else{
          return { // this.VIEWTYPE === 'wide'
            'height': '5vw',
          }
        }
      }else{
        return {'height': '0vh'}
      }
    },
    FIELD: function(){
      return {
        'width': this.fw +'px',
        'height': this.fh +'px',
        'left': this.wOff +'px',
        'top': this.hOff +'px'
      }
    },
    cellStyle: function(){
      return{
        'width': this.bs +'px',
        'height': this.bs +'px'
      }
    }

  },
  methods: {
    ...mapMutations([
      'moveTo',
    ]),
    onResize(){
      if((this.VIEWTYPE === 'small') || (this.VIEWTYPE === 'narrow')){
        this.$store.state.circleAnime.colCount = 7; // 0.5, 6, 0.5
      }else if(this.VIEWTYPE === 'tablet'){
        this.$store.state.circleAnime.colCount = 10; // 1.5, 7, 1.5
      }else{
        this.$store.state.circleAnime.colCount = 15; // 1.5, 12, 1.5
      }
      this.sizeCalc();
    },
    sizeCalc(){
      if((this.VIEWTYPE === 'small') || (this.VIEWTYPE === 'narrow')){
        this.$store.state.circleAnime.blockSize = parseInt(this.winSize.vw/(this.blockCounts.c-1));
        this.$store.state.circleAnime.rowCount = parseInt(this.winSize.vh/this.bs) + 1
      }else{
        this.$store.state.circleAnime.blockSize = parseInt(this.winSize.vw/(this.blockCounts.c-3));
        this.$store.state.circleAnime.rowCount = parseInt(this.winSize.vh/this.bs) + 2
      }
      this.$store.state.circleAnime.fieldWidth = this.bs * this.blockCounts.c;
      this.$store.state.circleAnime.fieldHeight = this.blockCounts.r * this.bs;
      this.$store.state.circleAnime.wOff = (this.winSize.vw-this.fw)/2;
      this.$store.state.circleAnime.hOff = (this.winSize.vh-this.fh)/2;
    },
    getBlockArr(){
      this.$store.state.blocks = [];
      for(var i=0; i<this.blockCounts.r; i++){
        for(var j=0; j<this.blockCounts.c; j++){
          this.$store.state.blocks.push('c' + j + 'r' + i);
        }
      }
    },


  },
  watch: {
    colCount(nu, old){
      this.getBlockArr();
      return {nu, old}
    },
    rowCount(nu, old){
      this.getBlockArr();
      return {nu, old}
    },
    CELL_MOUNTED(nu, old){
      if(this.blocks.length === nu){
        this.$store.state.cellTiming.allMounted = true
      }
      return old
    }
  },
  created() {

  },
  mounted() {
    this.onResize();
    this.getBlockArr();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });




  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.title-space{
  position: relative; top: 0; left: 0;
  width: 100vw; height: 100vh;
  transition: 500ms;
  transition-timing-function: cubic-bezier(0,0,.17,1);
  user-select: none;
  pointer-events: none;
  // background-color: rgba(230, 12, 56, 0.13);
}
.block-wrapper {
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  // background-color: rgba(10, 53, 53, 0.733);
}
.cell {
  position: relative;
  float: left;
  // background-color: rgb(0, 0, 128);
}
// .cell:hover{
//   background-color: rgb(51, 51, 155);
// }




</style>