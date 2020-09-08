<template>
<div id="canvas">
  <canvas 
    id="view" 
    class="canvas-style"
    @mouseenter="mouse"
  ></canvas>




</div>
</template>



<script>
const paper = require('paper');

export default {
  name: "Canvas",
  props: ['canvasID'],
  data() { return {
    scope: null,
    mousePoint: null,
    amount: 25,
    colors: ['red', 'white', 'blue', 'white'],
    children: null
  }},
  computed: {

  },
  methods: {
    mouse(){
      // console.log('f: mouseMove');
      // this.scope.activate();

      let self = this;
      this.scope.view.onMouseMove = (event) => {
        self.mousePoint = event.point;
      }
      
      
    }
  },
  created() {
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.scope.setup(document.getElementById('view'));
    this.mousePoint =  this.scope.view.center;
    for (var i = 0; i < this.amount; i++) {
      var rect = new this.scope.Rectangle([0, 0], [25, 25]);
      rect.center = this.mousePoint;
      var path = new this.scope.Path.Rectangle(rect, 6);
      path.fillColor = this.colors[i % 4];
      var scale = (1 - i / this.amount) * 20;
      path.scale(scale);
    }

    this.scope.view.onMouseMove = (e) => {
      this.mousePoint = e.point;
    }
    
    this.children = this.scope.project.activeLayer.children;
    this.scope.view.onFrame = (event) => {
      for (var i = 0, l = this.children.length; i < l; i++) {
        var item = this.children[i];
        var delta = (this.mousePoint - item.position) / (i + 5);
        item.rotate(Math.sin((event.count + i) / 10) * 7);
        if (delta.length > 0.1) {
          item.position += delta;
        }
      }
    }

  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#canvas {
  position: absolute; top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: azure;
}
.canvas-style {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
}




</style>