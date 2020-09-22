<template>
<div class="title-sign-wrapper">
    <canvas id="title-sign"></canvas>
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
    relocationInfo: {
      x:0.1, y:0, w:0.8, h:0.4
    },


    // _____ RENDERING _____
    goRen: false,
    pathLength: 0, segLength: 0,
    renderProgress: {path:0, seg:0},
    renderSpeed: 18,
    RENDERED: [],


    single: null,
    circle: null,
    expandCounter: 0,
    expandLimit: 0,
    intersection: null,


    renPath: [],

  }},
  computed: {
    ...mapState(['winSize', 'displayConfig', 'renderSign']),
    ...mapGetters(['SEQ', 'RENDER_Q']),
    X: function(){
      return this.displayConfig.x
    },
    Y: function(){
      return this.displayConfig.y
    },
    W: function(){
      return this.displayConfig.width
    },
    H: function(){
      return this.displayConfig.height
    },

  },
  methods: {
    ...mapMutations(['renderTrigger']),
    RELOCATE(){
      this.displayConfig.x = this.getSize('x', 'vw');
      this.displayConfig.y = this.getSize('y', 'vh');
      this.displayConfig.width = this.getSize('w', 'vw');
      this.displayConfig.height = this.getSize('h', 'vw');
      this.canvasStyle = {
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
      return this['relocationInfo'][i] * this['winSize'][el]
    },
    _px(source){
      return source + 'px'
    },


    render(scope, goRen, renderSign, pathLength, segLength, pathNow, segNow, single, circle, expandCounter, expandLimit, intersection, renPath){
      console.log('=== render ===');
      console.log('renderSign', renderSign);

      if(expandCounter === 0){
        if(single === null){
          if(segNow === segLength-1){
            if(pathNow === pathLength-1){
              pathNow = 0;
              segNow = 0;
              goRen = false;
            }else{
              pathNow += 1;
              segNow = renderSign.arr[pathNow].length
              segNow = 0;
            }
          }else{
            console.log(pathNow);
            console.log(segNow);
            let segA = renderSign.arr[pathNow]['segments'][segNow];
            let segB = renderSign.arr[pathNow]['segments'][segNow + 1];
            console.log(segA);
            console.log(segB);
            this.startNewSingle(scope, segA, segB, expandLimit, single, circle);
            this.startPath(scope, renPath, segA.point);
            this.getIntersection(single, circle, intersection);
            this.addSeg(renPath, intersection);
            expandCounter += 1;
          }
        }
      }else if(expandCounter > expandLimit-1){
        segNow += 1;
        this.closeSingle(single, circle, expandCounter, expandLimit);
      }else{
        this.expandCricle(circle);
        this.getIntersection(single, circle, intersection);
        this.addSeg(renPath, intersection);
        expandCounter += 1;
      }
    },


    startNewSingle(scope, segA, segB, expandLimit, single, circle){
      console.log('-- startNewSingle --');
      this.setExpandLimit(scope, segA, segB, expandLimit);
      this.createSingle(scope, segA, segB, single);
      this.createCircle(scope, segA, circle);
    },
    setExpandLimit(scope, segA, segB, expandLimit){
      let path = new scope.Point(
        segA.point.x - segB.point.x,
        segA.point.y - segB.point.y
      )
      expandLimit = path.length;
      console.log('expandLimit',expandLimit);
    },
    createSingle(scope, segA, segB, single){
      var pointZero = new scope.Point( 0, 0 );
      var handleA = new scope.Point(
        segA.handleOut.x,
        segA.handleOut.y,
      );
      var handleB = new scope.Point(
        segB.handleIn.x,
        segB.handleIn.y,
      );
      var APoint = new scope.Point(
        segA.point.x,
        segA.point.y,
      );
      var BPoint = new scope.Point(
        segB.point.x,
        segB.point.y,
      );
      var A = new scope.Segment(APoint, pointZero, handleA);
      var B = new scope.Segment(BPoint, handleB, pointZero);
      single = new scope.Path(A, B);
      single.strokeColor = 'white';
      single.fullySelected = true;
      console.log('single', single);
    },
    createCircle(scope, segA, circle){
      console.log(segA.point.x);
      console.log(segA.point.y);
      var cir = new scope.Path.Circle({
        center: new scope.Point(segA.point.x, segA.point.y),
        radius: 1
      });
      cir.strokeColor = 'white';
      console.log(cir);
      circle = cir;
      console.log('circle', circle);
    },
    closeSingle(single, circle, expandCounter, expandLimit){
      single = null;
      circle = null;
      expandCounter = 0;
      expandLimit = 0;
      console.log(single, circle, expandCounter, expandLimit);
    },


    expandCricle(circle){
      circle.radius += 1;
      console.log('circle.radius', circle.radius);
    },
    getIntersection(path1, path2, intersection) {
      // console.log(path1.getIntersections);
      // console.log(path1.getCurves());
      let A = path1;
      let B = path2;
      console.log(A);
      console.log(B);
      let intersections = A.getIntersections(B);
      intersection = intersections[0].point;
      console.log('intersection', intersection);
    },
    startPath(scope, renPath, point){
      renPath = new scope.Path({
        segments: [ point ],
        strokeColor: 'red',
        strokeWidth: 7,
        strokeCap: 'round'
      });
    },
    addSeg(renPath, interectionPoint){
      renPath.add(interectionPoint);
      renPath.smooth('continuous');
      interectionPoint = null;
    }

  },
  watch: {
    RENDER_Q(nu, old){
      if(nu){
        console.log('-- render go --');
        this.pathLength = this.renderSign.arr.length;
        this.segLength = this.renderSign.arr[this.renderProgress.path].segments.length;
        console.log('pathLength:',this.pathLength);
        console.log('segLength:',this.segLength);
        this.goRen = true;
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
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.RELOCATE();
    this.$nextTick(() => {
      window.addEventListener('resize', this.RELOCATE);
    });
    this.scope.setup(document.getElementById('title-sign'));

    this.scope.view.onFrame = () => {
      if(this.goRen){
        this.render(this.scope, this.goRen, this.renderSign, this.pathLength, this.segLength, this.renderProgress.path, this.renderProgress.seg, this.single, this.circle, this.expandCounter, this.expandLimit, this.intersection, this.renPath)
      }else{
        return 1
      }
    }


    this.circle = new this.scope.Path.Circle({
      center: new this.scope.Point(100, 100),
      radius: 1,
      fillColor: 'white'
    });

    // this.scope.view.onMouseMove = (event) => {
    //   console.log(event.point.x, event.point.y);
    // }

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
  background-color: rgba(240, 248, 255, 0.308);
}.title-sign-wrapper:hover{
  cursor: pointer;
  background-color:  rgba(240, 248, 255, 0.808);
}

#title-sign{
  width: 100%; height: 100%;
}






</style>