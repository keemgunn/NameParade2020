<template>
<div class="parade-wrapper">

  <div class="top-space" :style="topSpace"></div>
  <div class="title-wrapper" :style="title">
    <div v-for="block in titleBlocks" :key="block">
      <div class="cell" :style="cellStyle">
        <TitleCell 
          :index="block" 
          @mounted='titleCellMounted'
        />
      </div>
    </div>
  </div>

  <div class="content-wrapper" :style="contentStyle">
    <div class="display-wrapper" :style="displayStyle">
      <Display />
    </div>
  </div>






</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TitleCell from './parade/TitleCell';
import Display from './parade/Display';


export default {
  name: "Parade",
  components: { TitleCell, Display,  },
  props: [

  ],
  data() { return {
    topSpace: {
      height: "0px",
    },
    title: {
      left: "0px", width: "0px", height: "0px"
    },
    contentStyle:{
      left: "0px", width: "0px"
    },
    displaySize: {
      small: 5, narrow: 5, tablet: 6, wide: 5
    },
    titleBlocks: [],



  }},
  computed: {
    ...mapState([
      'circleAnime',
      'blocks',

      
    ]),
    ...mapGetters([
      'VIEWTYPE',
      'bs'
    ]),
    gridType: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          index: 15, xAdd: 0, yAdd: 0,
          wCount: 5, hCount: 2
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          index: 12, xAdd: 0, yAdd: 0,
          wCount: 6, hCount: 2
        }
      }else{
        return {
          index: 17, xAdd: 0, yAdd: 0,
          wCount: 11, hCount: 3
        }
      }
    },
    cellStyle: function(){
      return{
        'width': this.bs +'px',
        'height': this.bs +'px'
      }
    },
    GSstyle: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          'top': '4vw', 'left': '4vw',
          'width': '70vw', 'height': '35vw'
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          'top': '2vw', 'left': '2vw',
          'width': '60vw', 'height': '30vw'
        }
      }else{
        return {
          'top': '10vw', 'left': '7vw',
          'width': '44vw', 'height': '22vw'
        }
      }
    },
    contentSize: function(){
      if((this.VIEWTYPE === 'small')||(this.VIEWTYPE === 'narrow')){
        return {
          column: 5
        }
      }else if(this.VIEWTYPE === 'tablet'){
        return {
          column: 6
        }
      }else{
        return {
          column: 11
        }
      }
    },
    displayStyle: function(){
      return {
        width: this.displaySize[this.VIEWTYPE] * this.bs + 'px',
        height: (this.displaySize[this.VIEWTYPE]-1) * this.bs + 'px',
      }
    }
  },
  methods: {
    ...mapMutations([
      'bbcTrigger'
    ]),
    getGridHeight(blocks, circleAnime, {index, xAdd, yAdd, wCount, hCount}){
      let coords = blocks[index].split('x');
      let column = parseInt(coords[0]);
      let row = parseInt(coords[1]);
      let left = (column+xAdd)*circleAnime.blockSize + this.circleAnime.wOff +'px';
      let top = (row+yAdd)*circleAnime.blockSize + this.circleAnime.hOff +'px';
      let width = wCount*circleAnime.blockSize +'px';
      let height = hCount*circleAnime.blockSize +'px';
      return { left, top, width, height }
    },
    titleCellMounted(){
      this.$store.state.cellTiming.paradeTitleMounted += 1;
    }



  },
  created() {
    let { left, top, width, height } = this.getGridHeight(this.blocks, this.circleAnime, this.gridType);
    this.topSpace.height = top;
    this.title.left = left;
    this.title.width = width;
    this.title.height = height;
    this.contentStyle.left = left;
    this.contentStyle.width = this.bs * this.contentSize.column +'px';


    let blockCount = this.gridType.wCount * this.gridType.hCount;
    for(var i=0; i < blockCount; i++){
      this.titleBlocks.push(i);
    }
    this.$store.state.cellTiming.paradeTitleCellCount = this.titleBlocks.length;
    console.log(this.$store.state.cellTiming.paradeTitleCellCount);
    this.titleBlocks;

  },
  mounted() {
    this.bbcTrigger(false);
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.parade-wrapper{
  position: relative;
  width: 100%; height: fit-content;
  // background-color: rgba(127, 255, 212, 0.349);
}
.top-space{
  position: relative;
  width: 100%;
  // background-color: rgba(0, 17, 255, 0.288);
}
.title-wrapper{
  position: relative; top: 0;
  // background-color: rgba(207, 35, 35, 0.322);
}
.cell {
  position: relative;
  float: left;
}
.graphic-sign-wrapper{
  position: absolute; 
  // background-color: rgba(20, 255, 224, 0.452);
}
.content-wrapper{
  position: relative; 
  top: 0;
  height: fit-content;
  // background-color: rgba(231, 211, 33, 0.219);
}
.display-wrapper{
  position: relative;
  top: 0; left: 0;
  // background-color: rgba(0, 0, 139, 0.384);
}







</style>