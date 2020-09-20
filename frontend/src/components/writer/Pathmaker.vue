<template>
<div id="pathmaker">
  <canvas 
  id="maker" 
  class="maker"
  :class="byType"
  :style="canvasLocation"
  ></canvas>

  <div id="testModal" v-if="1">
    <button @click="render()">render</button> <br>
    <button>test01</button> <br>
    <button>test02</button> <br>
    <button>test03</button> <br>
    <button @click="SEND()">SEND</button>
  </div>

</div>
</template>



<script>
const paper = require('paper');
import { mapState, mapGetters, mapMutations } from 'vuex';


export default {
  name: "Pathmaker",
  components: { },
  props: [
    
  ],
  data() { return {
    scope: null,
    okToWrite: false,
    simplifyVal: 1.4,
    relocationInfo: {
      small: { x:0.1, y:0.5, w:0.8, h:0.2 },
      narrow: { x:0.1, y:0.5, w:0.8, h:0.2 },
      tablet: { x:0.1, y:0.5, w:0.8, h:0.2 },
      wide: { x:0.1, y:0.5, w:0.8, h:0.2 },
    },
    visiblePath: [],
    canvasLocation: {}, // style object
    scopeSize: {width:0, height:0},
    relocation: {x:0, y:0},

    // _____ RENDERING _____
    PATHS: [],
    renderProgress: {path:0, seg:0},
    renderSpeed: 18,
    RENDERED: [],
    renPath: [],

  }},
  computed: {
    ...mapState(['winSize', 'writer']),
    ...mapGetters(['byType', 'VIEWTYPE']),
    X: function(){
      return this.relocation.x
    },
    Y: function(){
      return this.relocation.y
    },
    W: function(){
      return this.scopeSize.width
    },
    H: function(){
      return this.scopeSize.height
    },
  },
  methods: {
    ...mapMutations(['SEND_PATHS']),
    RELOCATE(){
      this.writer.scale = this.getSize('x', 'vw');
      this.relocation.x = this.getSize('x', 'vw');
      this.relocation.y = this.getSize('y', 'vh');
      this.scopeSize.width = this.getSize('w', 'vw');
      this.scopeSize.height = this.getSize('h', 'vh');
      this.canvasLocation = {
        'left': this._px(this.X),
        'top': this._px(this.Y),
        'width': this._px(this.W),
        'height': this._px(this.H)
      };
      if(this.scope.view){
        this.scope.view.viewSize.width = this.W;
        this.scope.view.viewSize.height = this.H;
      }
    },
    getSize(i, el){
      return this['relocationInfo'][this.VIEWTYPE][i] * this['winSize'][el]
    },
    _px(source){
      return source + 'px'
    },

    SEND(){
      this.SEND_PATHS();
      for(var i=0; i < this.visiblePath.length; i++){
        this.visiblePath[i].remove();
      }
      this.writer.paths = [];
    },


    render(){
      if(this.RENDERED.length){ // DELETE WHEN EXISTS
        for(var i=0; i < this.RENDERED.length; i++){
          this.RENDERED[i].remove();
        }
      }
      this.PATHS = this.writer.paths;
      this.stroke({
        pathIndex: this.renderProgress.path, 
        segIndex: this.renderProgress.seg
      });
    },
    stroke({pathIndex, segIndex}){

      let segPoint = new this.scope.Point(this.PATHS[pathIndex][segIndex].x, this.PATHS[pathIndex][segIndex].y);

      if(segIndex===0){ 
        // FIRST SEG ---
        this.renPath = new this.scope.Path({
          segments: [ segPoint ], // array
          strokeColor: 'red',
          strokeWidth: 7,
          strokeCap: 'round'
        });
        this.renderProgress.seg += 1;
        setTimeout(this.stroke, this.renderSpeed, {
          pathIndex: this.renderProgress.path, 
          segIndex: this.renderProgress.seg
        });
      }
      else if(segIndex === this.PATHS[pathIndex].length-1){ 
        // LAST SEG ---
        this.renPath.add(segPoint);
        this.renPath.simplify(this.simplifyVal);
        this.RENDERED.push(this.renPath);
        if(pathIndex === this.PATHS.length-1){
          // LAST PATH / LAST SEG ---
          console.log('-- RENDER DONE --');
          this.renderProgress.path = 0;
          this.renderProgress.seg = 0;
        }else{
          this.renderProgress.path += 1;
          this.renderProgress.seg = 0;
          setTimeout(this.stroke, this.renderSpeed*20, {
            pathIndex: this.renderProgress.path, 
            segIndex: this.renderProgress.seg
          })
        }
      }
      else{
        this.renPath.add(segPoint);
        this.renPath.smooth('continuous');
        this.renderProgress.seg += 1;
        setTimeout(this.stroke, this.renderSpeed, {
          pathIndex: this.renderProgress.path, 
          segIndex: this.renderProgress.seg
        })
      }
    },
    


  },
  created() {
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.RELOCATE();
    this.$nextTick(() => {
      window.addEventListener('resize', this.RELOCATE);
    });
    this.scope.setup(document.getElementById('maker'));
    this.scope.view._pixelRatio = 1;
    this.RELOCATE();

    console.log(this.scope.view);
    console.log(document.getElementById('maker').style);

    var visible;
    var segPoints = [];

    this.scope.view.onMouseEnter = () => {
      this.okToWrite = true;
    }
    this.scope.view.onMouseLeave = () => {
      this.okToWrite = false;
    }

    this.scope.view.onMouseDown = (event) => {
      this.okToWrite = true;
      segPoints = [];
      var locatedPoint = new this.scope.Point(
        event.point.x + this.X, 
        event.point.y + this.Y
      )
      visible = new this.scope.Path({
        segments: [ locatedPoint ], // array
        strokeColor: 'white',
        strokeWidth: 5,
        strokeCap: 'round'
      })
      var pointCore = {x: event.point.x, y: event.point.y}
      segPoints.push(pointCore);
    }

    this.scope.view.onMouseDrag = (event) => {
      if(this.okToWrite){
        var locatedPoint = new this.scope.Point(
          event.point.x + this.X, 
          event.point.y + this.Y
        )
        visible.add(locatedPoint);
        visible.smooth('continuous');
        var pointCore = {x: event.point.x, y: event.point.y};
        segPoints.push(pointCore);
      }
    }

    this.scope.view.onMouseUp = () => {
      visible.simplify(this.simplifyVal);
      this.visiblePath.push(visible);
      visible = [];
      this.writer.paths.push(segPoints);
      segPoints = [];
        // it saves segPoints without SIMPLIFICATION
        // SO ITS SEGMENTS ARE MUCH MORE THAN VISIBLEPATH's
    }







  }
}
</script>



<style lang="scss" scoped> 
.maker{
  z-index: -10;
  position: fixed;
  border: solid 2px white;
  background-color: rgba(0, 0, 0, 0.527);
}


#testModal {
  position: fixed;
  padding: 3px;
  left: 140px;
  top: 30px;
  border: solid 2px white;
  opacity: 0.8;
  button {
    margin: 2px;
  }button:hover{
    cursor: pointer;
  }


  transition-timing-function: cubic-bezier(0,.82,.38,.92);


}



</style>