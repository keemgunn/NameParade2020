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
    simplifyVal: 10,
    relocationInfo: {
      small: { x: 0.1, y: 0.5 },
      narrow: { x: 0.1, y: 0.5 },
      tablet: { x: 0.1, y: 0.5 },
      wide: { x: 0.1, y: 0.5 },
    },
    canvasLocation: {'left':'0', 'right':'0'}

  }},
  computed: {
    ...mapState(['winSize', 'writer']),
    ...mapGetters(['byType', 'VIEWTYPE'])
  },
  methods: {
    relocation(){
      this.writer.relocation.x = this['relocationInfo'][this.VIEWTYPE]['x'] * this.winSize.vw;
      this.writer.relocation.y = this['relocationInfo'][this.VIEWTYPE]['y'] * this.winSize.vh;
      this.canvasLocation = {
        'left': (this['relocationInfo'][this.VIEWTYPE]['x'] * 100) + '%',
        'top': (this['relocationInfo'][this.VIEWTYPE]['y'] * 100) + '%',
      }
    }
  },
  created() {
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.relocation();
    this.$nextTick(() => {
      window.addEventListener('resize', this.relocation);
    });
    this.relocation(this.VIEWTYPE);
    this.scope.setup(document.getElementById('maker'));
    this.scope.view._pixelRatio = 1;
    this.writer.scopeSize.width = this.scope.view.size.width;
    this.writer.scopeSize.height = this.scope.view.size.height;
    this.writer.pixelRatio = this.scope.view.pixelRatio;

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
        event.point.x + this.writer.relocation.x, 
        event.point.y + this.writer.relocation.y
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
          event.point.x + this.writer.relocation.x, 
          event.point.y + this.writer.relocation.y
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
._small{
  width: 80%; height: 20%;
}._narrow{
  width: 400px; height: 200px;
}._tablet{
  width: 80%; height: 20%;
}._wide{
  width: 80%; height: 20%;
}





</style>