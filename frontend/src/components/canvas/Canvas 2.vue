<template>
<div id="canvas">
  <canvas 
    id="view" 
    class="canvas-style"
  ></canvas>




</div>
</template>



<script>
const paper = require('paper');

export default {
  name: "Canvas",
  props: [ ],
  data() { return {
    scope: null,
    amount: 25,
    colors: ['#13C695', 'white', '#4BFFBC', 'white'],
  }},
  computed: {

  },
  methods: {

  },
  created() {
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.scope.setup(document.getElementById('view'));
    var mousePoint = this.scope.view.center;

    for (var i = 0; i < this.amount; i++) {
      var rect = new this.scope.Rectangle([0, 0], [25, 25]);
      rect.center = mousePoint;
      var path = new this.scope.Path.Rectangle(rect, 6);
      path.fillColor = this.colors[i % 4];
      var scale = (1 - i / this.amount) * 10;
      path.scale(scale);
    }

    this.scope.view.onMouseMove = (event) => {
      mousePoint = event.point;
    }
    
    let children = this.scope.project.activeLayer.children;
    var pos, delta;
    this.scope.view.onFrame = (event) => {
      for (var i = 0, l = children.length; i < l; i++) {
        var item = children[i];

        pos = item.position
        delta = new this.scope.Point(
          (mousePoint.x - pos.x)/(i+5), 
          (mousePoint.y - pos.y)/(i+5)
        );

        item.rotate(Math.sin((event.count + i) / 10) * 7);

        // console.log(delta.length);
        if (delta.length > 0.1){
          item.position = new this.scope.Point(
            (pos.x + delta.x), 
            (pos.y + delta.y)
          );
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