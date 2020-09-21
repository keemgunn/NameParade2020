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

    rendasfder(){
      this.stroke({
        pathIndex: this.renderProgress.path, 
        segIndex: this.renderProgress.seg
      });
    },
    stroke({pathIndex, segIndex}){
      let segPoint = new this.scope.Point(
        this.renderSign.arr[pathIndex][segIndex].x 
          * this.renderSign.scale
        ,this.renderSign.arr[pathIndex][segIndex].y 
          * this.renderSign.scale
      );
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
      else if(segIndex === this.renderSign.arr[pathIndex].length-1){ 
        // LAST SEG ---
        this.renPath.add(segPoint);
        this.renPath.simplify(this.simplifyVal);
        this.RENDERED.push(this.renPath);
        if(pathIndex === this.renderSign.arr.length-1){
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

    render(pathNow, segNow){
      console.log('=== render ===');
      console.log('renderSign', this.renderSign);

      if(this.expandCounter === 0){
        if(this.single === null){
          if(segNow === this.segLength-1){
            if(pathNow === this.pathLength-1){
              pathNow = 0;
              segNow = 0;
              this.goRen = false;
            }else{
              pathNow += 1;
              segNow = this.renderSign.arr[pathNow].length
              segNow = 0;
            }
          }else{
            console.log(pathNow);
            console.log(segNow);
            let segA = this.renderSign.arr[pathNow]['segments'][segNow];
            let segB = this.renderSign.arr[pathNow]['segments'][segNow + 1];
            this.startNewSingle(segA, segB);
            this.startPath(segA.point);
            this.getIntersection(this.single, this.circle);
            this.addSeg(this.intersection);
            this.expandCounter += 1;
          }
        }
      }else if(this.expandCounter > this.expandLimit-1){
        segNow += 1;
        this.closeSingle();
      }else{
        this.expandCricle(this.circle);
        this.getIntersection(this.single, this.circle);
        this.addSeg(this.intersection);
        this.expandCounter += 1;
      }
    },


    startNewSingle(segA, segB){
      console.log('-- startNewSingle --');
      this.setExpandLimit(segA, segB);
      this.createSingle(segA, segB);
      this.createCircle(segA);
    },
    setExpandLimit(segA, segB){
      let path = new this.scope.Point(
        segA.point.x - segB.point.x,
        segA.point.y - segB.point.y
      )
      this.expandLimit = path.length;
      console.log('expandLimit',this.expandLimit);
    },
    createSingle(segA, segB){
      var pointZero = new this.scope.Point( 0, 0 );
      var handleA = new this.scope.Point(
        segA.handleOut.x,
        segA.handleOut.y,
      );
      var handleB = new this.scope.Point(
        segB.handleIn.x,
        segB.handleIn.y,
      );
      var APoint = new this.scope.Point(
        segA.point.x,
        segA.point.y,
      );
      var BPoint = new this.scope.Point(
        segB.point.x,
        segB.point.y,
      );
      var A = new this.scope.Segment(APoint, pointZero, handleA);
      var B = new this.scope.Segment(BPoint, handleB, pointZero);
      this.single = new this.scope.Path(A, B);
      this.single.strokeColor = 'white';
      this.single.fullySelected = true;
      console.log('single', this.single);
    },
    createCircle(segA){
      console.log(segA.point.x);
      console.log(segA.point.y);
      var cir = this.Circle(segA.point.x, segA.point.y, 1);
      cir.strokeColor = 'white';
      console.log(cir);
      this.circle = cir;
      console.log('circle', this.circle);
    },
    Circle(x, y, r){
      var path = new this.scope.Path.Circle({
        center: new this.scope.Point(x, y),
        radius: r
      });
      return path
    },
    closeSingle(){
      this.single = null;
      this.circle = null;
      this.expandCounter = 0;
      this.expandLimit = 0;
    },


    expandCricle(circle){
      circle.radius += 1;
      console.log('circle.radius', circle.radius);
    },
    getIntersection(path1, path2) {
      // console.log(path1.getIntersections);
      // console.log(path1.getCurves());
      let A = path1;
      let B = path2;
      console.log(A);
      console.log(B);
      let intersections = A.getIntersections(B);
      this.intersection = intersections[0].point;
      console.log('intersection', this.intersection);
    },
    startPath(point){
      this.renPath = new this.scope.Path({
        segments: [ point ],
        strokeColor: 'red',
        strokeWidth: 7,
        strokeCap: 'round'
      });
    },
    addSeg(interectionPoint){
      this.renPath.add(interectionPoint);
      this.renPath.smooth('continuous');
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
        this.render(this.renderProgress.path, this.renderProgress.seg)
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