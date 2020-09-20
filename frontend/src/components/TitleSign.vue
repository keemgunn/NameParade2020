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
    renderProgress: {path:0, seg:0},
    renderSpeed: 18,
    RENDERED: [],
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

    render(){
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







  },
  watch: {
    RENDER_Q(nu, old){
      if(nu){
        console.log('-- render go --');
        this.render();
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