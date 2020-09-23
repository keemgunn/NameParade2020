<template>
<div class="title-sign-wrapper">
  <canvas id="title-sign"></canvas>

  <div id="test">
    <button @click="render()">render go</button>
  </div>

</div>
</template>






<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const paper = require('paper');


export default {
  name: "TitleSign",
  components: { },
  data() { return {
    scope: null,
    canvasEl: null,
    canvasCoords: {},


    renderReady: false,
    mySign: {
      scale:0, arr:[], offsetX:0, offSetY:0
    },
    renderProgress: {path:0, seg:0},
    renderSpeed: [5, 7],
    renPath: [], RENDERED: [],
    effect: [],
    effectProp: [
      {
        center: null,
        radius: 10,
        fillColor: 'white'
      },{
        center: null,
        radius: 15,
        fillColor: 'pink'
      }
    ],

    strokeStyle: {
      color: 'white',
      width: 10
    },
  }},
  computed: {
    ...mapState([]),
    ...mapGetters(['SEQ']),
    X: function(){
      return this.canvasCoords.x
    },
    Y: function(){
      return this.canvasCoords.y
    },
    W: function(){
      return this.canvasCoords.w
    },
    H: function(){
      return this.canvasCoords.h
    },
    proInfo: function(){
      return {
        pathIndex: this.renderProgress.path, 
        segIndex: this.renderProgress.seg
      }
    }
  },
  methods: {
    ...mapMutations(['renderTrigger']), 
    onResize(){
      this.canvasCoords = this.getCoords(this.canvasEl);
      this.mySign.offsetX = this.canvasCoords.w * 0.02
      this.mySign.offsetY = -(this.canvasCoords.h * 0.15)
    },
    getCoords(elem) { // crossbrowser version
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docEl = document.documentElement;
      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;
      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      return { 
        x: Math.round(left),
        y: Math.round(top),
        w: box.width, 
        h: box.height
      };
    },
  
    render(){
      if(this.mySign.arr.length){
        this.stroke(this.proInfo);
      }else{
        console.log('something wrong .../TitleSign/render');
      }
    },
    stroke({pathIndex, segIndex}){
      let segPoint = new this.scope.Point(
        (this.mySign.arr[pathIndex][segIndex].x 
          * this.mySign.scale + this.X + this.mySign.offsetX)
        ,(this.mySign.arr[pathIndex][segIndex].y 
          * this.mySign.scale + this.Y + this.mySign.offsetY)
      );
      if(segIndex===0){ 
        console.log(this.effectProp[pathIndex]);
        // FIRST SEG ---------
        this.effect.push(this.newEffect(this.scope, segPoint, pathIndex));
        this.renPath = new this.scope.Path({
          segments: [ segPoint ], // array
          strokeColor: this.strokeStyle.color,
          strokeWidth: this.strokeStyle.width,
          strokeCap: 'round'
        });
        this.renderProgress.seg += 1;
        setTimeout(this.stroke, this.renderSpeed[pathIndex], this.proInfo);
      }
      else if(segIndex === this.mySign.arr[pathIndex].length-1){ 
        // LAST SEG ---------
        this.renPath.add(segPoint);
        this.RENDERED.push(this.renPath);
        this.effect[pathIndex].position = segPoint;
        if(pathIndex === this.mySign.arr.length-1){
          // LAST PATH && LAST SEG ------
          console.log('-- RENDER DONE --');
          this.renderProgress.path = 0;
          this.renderProgress.seg = 0;
        }else{
          this.renderProgress.path += 1;
          this.renderProgress.seg = 0;
          setTimeout(this.stroke, 100, this.proInfo);
        }
      }
      else{
        this.renPath.add(segPoint);
        this.renPath.smooth('continuous');
        this.renderProgress.seg += 1;
        this.effect[pathIndex].position = segPoint;
        setTimeout(this.stroke, this.renderSpeed[pathIndex], this.proInfo);
      }
    },
    newEffect(scope, point, i){
      this.effectProp[i].center = [point.x, point.y];
      console.log(this.effectProp[i]);
      let eff = new scope.Path.Circle(this.effectProp[i]);
      console.log(eff);
      return eff
    }
    // 같은 펑션 안에서 똑같은 메서드를 통한 똑같은 도형이 다시 만들어질 수가 없네
    // 설정한 정보들을 하나도 못 받아내고 있어
    // -- 해답: 같은 펑션, 같은 메서드를 이용해서 오브젝트를 만들 수는 있다.
    // 하지만 전달받는 속성 인자들에 동일한 오브젝트를 사용하면
    // 두 번째 부터는 몇 가지 인자들이 유실된다. 
    // 처음 랜더링 하고 전달받은 속성 인자를 없애나 그러는 것 같음.





  },
  watch: {
    SEQ(nu, old){
      if(nu){
        console.log('-- render go --');
        // this.render();
      }
      if(old){
        console.log('-- render done --');
        // == refresh method here ==
        // if(this.RENDERED.length){
        //   for(var i=0; i < this.RENDERED.length; i++){
        //     this.RENDERED[i].remove();
        //   }
        // }
      }
    }
  },
  created() {
    },
  mounted() {
    this.canvasEl = document.getElementById('title-sign');
    this.onResize();
    this.scope = new paper.PaperScope();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.scope.setup(document.getElementById('title-sign'));

    this.mySign.arr = require('../assets/data/mySign.json');
    this.mySign.scale = ( this.W / 1750 );

    // ___________ PAPER TEST METHOD ______________
    const pm = require('../test/paperMethods');
    pm.boundCheck(this.scope);


  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.title-sign-wrapper{
  position: relative; 
  width: 100vw; height: 25vw;
  background-color: rgba(240, 248, 255, 0.164);
}

#title-sign{
  width: 100%; height: 100%;
}






</style>