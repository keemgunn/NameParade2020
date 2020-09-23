<template>
<div class="pathmaker">
  <canvas 
  id="maker" 
  class="maker"
  :class="byType"
  :style="canvasLocation"
  ></canvas>



  <div class="btn-wrapper" :class="byType">

  </div>

</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const paper = require('paper');

const name = 'Pathmaker';
export default {
  name,
  components: { },
  data() { return {
    scope: null,
    canvasEl: null,
    canvasCoords: {},

    okToWrite: false,
    simplifyVal: 8,
    strokeWidth: 0,

    visiblePath: [],
    visibleCircle: [],
    canvasLocation: {}, // style object
    scopeSize: {width:0, height:0},
    relocation: {x:0, y:0},

    // _____ TEST _____
    mouseX: -1,
    mouseY: -1,


  }},
  computed: {
    ...mapState(['winSize', 'writer']),
    ...mapGetters(['byType', 'VIEWTYPE', 'NEW_PATHS']),
    AT: function(){
      return this['aniTiming'][name]
    },
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
  },
  watch: {
    NEW_PATHS(nu, old){
      if(nu){
        console.log('watcher: paths detecred', nu);

      }else{
        console.log('watcher: nopaths', old);

      }
    }
  },
  methods: {
    ...mapMutations(['SEND_PATHS']),
    onResize(){
      this.canvasCoords = this.getCoords(this.canvasEl);
      this.writer.width = this.W;
      this.strokeWidth = this.W / 85;
    },
    getCoords(elem) { // crossbrowser version
      var box = elem.getBoundingClientRect();
      console.log(box);
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


    SEND(){
      this.SEND_PATHS();
      for(var i=0; i < this.visiblePath.length; i++){
        this.visiblePath[i].remove();
      }
      this.writer.paths = [];
    },
  },
  created() {
  },
  mounted() {
    this.canvasEl = document.getElementById('maker');
    this.onResize();
    this.scope = new paper.PaperScope();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.scope.setup(document.getElementById('maker'));

    this.scope.view.onMouseMove = (event) => {
      this.mouseX = event.point.x;
      this.mouseY = event.point.y;
    }

    var visible, segPoints;

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
        strokeWidth: this.strokeWidth,
        strokeCap: 'round',
        strokeJoin: 'round'
        // fullySelected: true
      });

      var pointCore = {x: event.point.x, y: event.point.y};
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

      console.log(visible.segments);

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
.pathmaker{
  position: relative; top: 0; left: 0;
  width: 100%; height: 100%;
  // background-color: rgba(255, 0, 0, 0.397);
}

.maker{
  z-index: 0;
  position: relative; top: 0; left: 0; 
  width: calc(100% - 4px); height: calc(100% - 4px);
  border: solid 2px white;
}

.button-wrapper{
  position: relative;
  ._small { // ==============================
    width: 100%; height: 21vw;

  }

  ._narrow { // ==============================
    width: 100%; height: 21vw;

  }

  ._tablet { // ==============================
    width: 100%; height: 19vw;

  }

  ._wide { // ==============================
    width: 100%; height: 4.6vw;

  }
}


</style>