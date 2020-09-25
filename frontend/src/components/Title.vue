<template>
<div class="title-space" :style="space">
<div class="block-wrapper" :style="wrapperStyle">
  <div v-for="block in blocks" :key="block">
    <div class="cell" :style="cellStyle">
      <Cell 
        :block="block" 
        :index="blocks.indexOf(block)" 
      />
    </div>
  </div>
</div>
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Cell from './title/Cell'

const name = "Title";
export default {
  name,
  components: { Cell, },
  data() { return {
    blockSize: null,
    rowCount: null,
    colCount: null,
    rw: null, rh: null,
    wOff: null, hOff: null,
    blocks: []
  }},
  computed: {
    ...mapState([ 
        'winSize',
        'aniTiming',
      ]),
    ...mapGetters([ 
        'VIEWTYPE', 
        'byType', 
        'SEQ',
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
    wrapperStyle: function(){
      return {
        'width': this.rw +'px',
        'height': this.rh +'px',
        'top': this.hOff +'px',
        'left': this.wOff +'px'
      }
    },
    cellStyle: function(){
      return{
        'width': this.blockSize +'px',
        'height': this.blockSize +'px'
      }
    }
  },
  methods: {
    ...mapMutations([
      'moveTo',
    ]),
    onResize(){
      if((this.VIEWTYPE === 'small') || (this.VIEWTYPE === 'narrow')){
        this.colCount = 7; // 0.5, 6, 0.5
      }else if(this.VIEWTYPE === 'tablet'){
        this.colCount = 10; // 1.5, 7, 1.5
      }else{
        this.colCount = 15; // 1.5, 12, 1.5
      }
      this.sizeCalc();
    },
    sizeCalc(){
      if((this.VIEWTYPE === 'small') || (this.VIEWTYPE === 'narrow')){
        this.blockSize = parseInt(this.winSize.vw/(this.colCount-1));
        this.rowCount = parseInt(this.winSize.vh/this.blockSize) + 1
      }else{
        this.blockSize = parseInt(this.winSize.vw/(this.colCount-3));
        this.rowCount = parseInt(this.winSize.vh/this.blockSize) + 2
      }
      this.rw = this.blockSize * this.colCount;
      this.rh = this.rowCount * this.blockSize;
      this.wOff = (this.winSize.vw-this.rw)/2;
      this.hOff = (this.winSize.vh-this.rh)/2;
    },
    getBlockArr(){
      this.blocks = [];
      for(var i=0; i<this.rowCount; i++){
        for(var j=0; j<this.colCount; j++){
          this.blocks.push('c' + j + 'r' + i);
        }
      }
    }
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

  },
  created() {

  },
  mounted() {
    this.onResize();
    this.getBlockArr();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    console.log(this.blocks);
    console.log(this.wrapperStyle);
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
  // background-color: rgba(230, 12, 56, 0.13);
}
.block-wrapper {
  position: fixed; top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(10, 53, 53, 0.733);
}
.cell {
  position: relative;
  float: left;
  background-color: rgb(0, 0, 128);
}.cell:hover{
  background-color: rgb(51, 51, 155);
}



</style>