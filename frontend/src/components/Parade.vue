<template>
<div class="parade-wrapper">
  <div class="top-space" :style="topSpace"></div>
  <div class="title-wrapper" :style="title">
    <div v-for="block in titleBlocks" :key="block">
      <div class="cell" :style="cellStyle">
        <TitleCell 
          :index="block" 
          @mounted='$store.state.cellTiming.paradeTitleMounted += 1'
        />
      </div>
    </div>
  </div>







</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TitleCell from './parade/TitleCell';



export default {
  name: "Parade",
  components: { TitleCell,  },
  props: [

  ],
  data() { return {
    topSpace: {
      height: "0px",
    },
    title: {
      left: "0px", width: "0px", height: "0px"
    },
    titleBlocks: [],



  }},
  computed: {
    ...mapState([
      'circleAnime',
      'blocks',

      
    ]),
    ...mapGetters([
      'VIEWTYPE'
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
        'width': this.circleAnime.blockSize +'px',
        'height': this.circleAnime.blockSize +'px'
      }
    }
  },
  methods: {
    ...mapMutations([

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
    }



  },
  created() {
    let { left, top, width, height } = this.getGridHeight(this.blocks, this.circleAnime, this.gridType);
    this.topSpace.height = top;
    this.title.left = left;
    this.title.width = width;
    this.title.height = height;
    // this['title']['padding-bottom'] = 0.5 * this.blockSize;
    let blockCount = this.gridType.wCount * this.gridType.hCount;
    for(var i=0; i < blockCount; i++){
      this.titleBlocks.push(i);
    }
    this.$store.state.cellTiming.paradeTitleCellCount = this.titleBlocks.length;
  },
  mounted() {

    




    
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
  width: 100%; height: 100%;
  background-color: rgba(127, 255, 212, 0.349);
}
.top-space{
  position: relative;
  width: 100%;
  // background-color: rgba(0, 17, 255, 0.288);
}
.title-wrapper{
  position: relative; top: 0;
  background-color: rgba(207, 35, 35, 0.322);
}
.cell {
  position: relative;
  float: left;
}







</style>