<template>
<div id="pathmaker">
  <canvas 
  id="maker" 
  class="maker"
  :class="byType"
  :style="canvasLocation"
  ></canvas>

</div>
</template>



<script>
const paper = require('paper');
import { mapState, mapGetters } from 'vuex';


export default {
  name: "Pathmaker",
  components: { },
  props: [
    
  ],
  data() { return {
    scope: null,
    okToWrite: false,
    simplifyVal: 5,
    relocationInfo: {
      small: { x:0.1, y:0.5, w:0.8, h:0.2 },
      narrow: { x:0.1, y:0.5, w:0.8, h:0.2 },
      tablet: { x:0.1, y:0.5, w:0.8, h:0.2 },
      wide: { x:0.1, y:0.5, w:0.8, h:0.2 },
    },
    canvasLocation: {}

  }},
  computed: {
    ...mapState(['winSize', 'writer']),
    ...mapGetters(['byType', 'VIEWTYPE']),
    X: function(){
      return this.writer.relocation.x
    },
    Y: function(){
      return this.writer.relocation.y
    },
    W: function(){
      return this.writer.scopeSize.width
    },
    H: function(){
      return this.writer.scopeSize.height
    }
  },
  methods: {
    relocation(){
      this.writer.relocation.x = this.getSize('x', 'vw');
      this.writer.relocation.y = this.getSize('y', 'vh');
      this.writer.scopeSize.width = this.getSize('w', 'vw');
      this.writer.scopeSize.height = this.getSize('h', 'vh');
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
    }
  },
  created() {
    this.scope = new paper.PaperScope();
    this.relocation();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.relocation);
    });
    this.scope.setup(document.getElementById('maker'));
    this.scope.view._pixelRatio = 1;
    this.writer.pixelRatio = this.scope.view.pixelRatio;
    this.relocation();

    console.log(this.scope.view);
    console.log(document.getElementById('maker').style);

    var dataPath;
    var visiblePath;

    this.scope.view.onMouseEnter = () => {
      this.okToWrite = true;
    }
    this.scope.view.onMouseLeave = () => {
      this.okToWrite = false;
    }

    this.scope.view.onMouseDown = (event) => {
      this.okToWrite = true;
      var locatedPoint = new this.scope.Point(
        event.point.x + this.X, 
        event.point.y + this.Y
      )
      visiblePath = new this.scope.Path({
        segments: [locatedPoint],
        strokeColor: 'white',
        strokeWidth: 5,
        strokeCap: 'round'
      })
      dataPath = new this.scope.Path({
        segments: [event.point],
      });
    }

    this.scope.view.onMouseDrag = (event) => {
      if(this.okToWrite){
        var locatedPoint = new this.scope.Point(
          event.point.x + this.X, 
          event.point.y + this.Y
        )
        visiblePath.add(locatedPoint);
        dataPath.add(event.point);
      }
    }

    this.scope.view.onMouseUp = () => {
      visiblePath.simplify(this.simplifyVal);
      dataPath.simplify(this.simplifyVal);
    }







  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.maker{
  z-index: -10;
  position: fixed;
  border: solid 2px white;
  background-color: rgba(0, 0, 0, 0.527);
}




</style>