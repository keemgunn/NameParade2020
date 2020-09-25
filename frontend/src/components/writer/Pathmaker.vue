<template>
<div class="pathmaker">
  <canvas id="maker" class="maker"></canvas>
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
const paper = require('paper');
const pm = require('../../assets/javascripts/pathmaker');

const name = 'Pathmaker';
export default {
  name,
  components: { },
  data() { return {
    scope: null,
    canvasEl: null,
    canvasCoords: {},

    okToWrite: 0, 
    inkLoaded: 1,

    // inBoard: 0,
    // contact: 0,


    pathMode: 0,
    pm: [
      'narrower', 'straight'
    ],

    strokeWidth: 4,
    Paths: [],


  }},
  computed: {
    ...mapState([
        'winSize',
        'writer',
        'writerUndo',
        'writerDone'
      ]),
    ...mapGetters([
        'byType', 
        'VIEWTYPE', 
        'NEW_PATHS'
      ]),
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
    },
    writerDone(nu, old){
      if(nu){
        console.log('-- writer done');
        this.topOffset -= this.topOffset * 0.03;
        this.inkLoaded = 0;
      }else{
        return old
      }
    }
  },
  methods: {
    ...mapMutations([]),
    onResize(){
      this.canvasCoords = this.getCoords(this.canvasEl);
      this.canvasCoords.center = {
        x: this.canvasCoords.x + (this.canvasCoords.w/2),
        y: this.canvasCoords.y + (this.canvasCoords.h/2)
      };
      this.scope.view.viewSize = new this.scope.Size(
        this.canvasCoords.w , this.canvasCoords.h
      );
      this.scope.view.center = new this.scope.Point(
        this.canvasCoords.center.x, 
        this.canvasCoords.center.y
      )
      this.writer.width = this.W;
      // if(this.VIEWTYPE === 'small'){
      //   this.strokeWidth = this.W / 66;
      // }else if(this.VIEWTYPE === 'narrow'){
      //   this.strokeWidth = this.W / 66;
      // }else if(this.VIEWTYPE === 'tablet'){
      //   this.strokeWidth = this.W / 80;
      // }else{
      //   this.strokeWidth = this.W / 85;
      // }
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
        h: box.height,
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
  mounted() {
    this.canvasEl = document.getElementById('maker');
    this.scope = new paper.PaperScope();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    this.scope.setup(document.getElementById('maker'));
    this.onResize();

  
    let coords = { x:0, y:0 };
    let last = null;
    let curr = null;
    let delta = null;
    let path = [
      // segments from pm.Stroke 
    ];
    let width = 8;
    let contact = 0;



    this.scope.view.onMouseEnter = () => {
      // console.log('enter');
    }
    this.scope.view.onMouseLeave = () => {
      console.log('leave');
      // inboard = 0; 
      contact = 0;
    }
    this.scope.view.onMouseMove = (event) => {
      console.log('move');
      coords = {x:event.point.x, y:event.point.y};
    }
    this.scope.view.onMouseDown = (event) => {
      console.log('down');
      coords = {x:event.point.x, y:event.point.y};
      last = pm.newPath(this.scope, coords);
      contact = 1;
    }
    this.scope.view.onMouseUp = () => {
      console.log('up');
      contact = 0;
    }


    

    this.onResize();
    this.scope.view.onFrame = () => {
      if(contact){
        curr = pm.newPath(this.scope, coords);
        delta = pm.getDelta(this.scope, last, curr);
        let seg = pm.Stroke(
          this.scope,{
            width,
            curr,
            delta
          }
        );
        path.push(seg);
        last = curr;
      }
    }







    // setTimeout(setupFrameFunction, 1800, {
    //   scope: this.scope, 
    //   inboard: this.inboard,
    //   contact: this.contact
    //   });
    // function setupFrameFunction(
    //   {scope , inboard, contact}){
    //   console.log('-- setupFrameFunction --');
    //   scope.view.onFrame = (event) => {
    //     console.log(inboard*contact);
    //     if(inboard * contact){
    //       curr = pm.newPath(scope, event);
    //       delta = pm.getDelta(scope, last, curr);
    //       let seg = pm.Stroke(
    //         scope,{
    //           width,
    //           curr,
    //           delta
    //         }
    //       );
    //       path.push(seg);
    //       last = curr;
    //     }
    //   }
    // }


  },
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