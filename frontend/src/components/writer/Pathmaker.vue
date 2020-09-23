<template>
<div class="pathmaker">
  <canvas id="maker" class="maker"></canvas>
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
    simplifyVal: 5,
    strokeWidth: 0,
    visiblePath: [],
  }},
  computed: {
    ...mapState(['winSize', 'writer', 'writerUndo']),
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
      if(nu === 0){
        console.log('watcher: nopaths');
      }else if(nu > old){
        console.log('watcher: paths ++', nu);
        console.log(this.writer.paths);
      }else{
        console.log('watcher: paths --', nu);
        console.log(this.writer.paths);
      }
    },
    writerUndo(nu, old){
      if(nu){
        this.writer.paths[nu].remove();
        this.visiblePath[nu].remove();
        this.writer.paths.pop();
        this.visiblePath.pop();
        this.$store.state.writerUndo = null;
      }else if(nu === 0){
        this.writer.paths[nu].remove();
        this.visiblePath[nu].remove();
        this.writer.paths.pop();
        this.visiblePath.pop();
        this.$store.state.writerUndo = null;
      }else{
        return old
      }
    }
  },
  methods: {
    ...mapMutations([]),
    onResize(){
      this.canvasCoords = this.getCoords(this.canvasEl);
      this.scope.view.viewSize.width = this.W;
      this.scope.view.viewSize.height = this.H;
      this.writer.width = this.W;
      if(this.VIEWTYPE === 'small'){
        this.strokeWidth = this.W / 66;
      }else if(this.VIEWTYPE === 'narrow'){
        this.strokeWidth = this.W / 66;
      }else if(this.VIEWTYPE === 'tablet'){
        this.strokeWidth = this.W / 80;
      }else{
        this.strokeWidth = this.W / 85;
      }
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
    this.scope = new paper.PaperScope();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.scope.setup(document.getElementById('maker'));
    this.onResize();

    this.scope.view.onMouseMove = (event) => {
      this.mouseX = event.point.x;
      this.mouseY = event.point.y;
    }




    var visible, actual;
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
      var rawPoint = new this.scope.Point(
        event.point.x + this.X, 
        event.point.y + this.Y
      )
      visible = new this.scope.Path({
        segments: [ locatedPoint ],
        strokeColor: 'white',
        strokeWidth: this.strokeWidth,
        strokeCap: 'round',
        strokeJoin: 'round'
      });
      actual = new this.scope.Path({
        segments: [ rawPoint ],
        strokeWidth: 1,
        strokeCap: 'round',
        strokeJoin: 'round'
      });
    }
    this.scope.view.onMouseDrag = (event) => {
      if(this.okToWrite){
        var locatedPoint = new this.scope.Point(
          event.point.x + this.X, 
          event.point.y + this.Y
        )
        var rawPoint = new this.scope.Point(
          event.point.x + this.X, 
          event.point.y + this.Y
        )
        visible.add(locatedPoint);
        actual.add(rawPoint);
        visible.smooth('continuous');
        actual.smooth('continuous');
      }
    }


    this.scope.view.onMouseUp = () => {
      visible.simplify(this.simplifyVal);
      actual.simplify(this.simplifyVal);
      
      this.visiblePath.push(visible);
      this.writer.paths.push(actual);
      visible = [];
      actual = [];
    }
  }
}
</script>



<style lang="scss" scoped> 
.pathmaker{
  position: relative; top: 0; left: 0;
  width: 100%; height: 100%;
  // background-color: rgba(0, 255, 98, 0.295);
}
#maker{
  z-index: 0;
  position: relative; top: 0; left: 0; 
  width: 100%; height: 100%;
}
</style>