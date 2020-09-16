<template>
<div id="pathmaker">
  <canvas 
  id="maker" 
  class="maker"
  :class="byType"
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
    simplification: 10,

  }},
  computed: {
    ...mapState(['writer']),
    ...mapGetters(['byType'])
  },
  watch: {
    
  },
  methods: {

  },
  created() {
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.scope.setup(document.getElementById('maker'));
    this.scope.view._pixelRatio = 1;
    this.writer.scopeSize.width = this.scope.view.size.width;
    this.writer.scopeSize.height = this.scope.view.size.height;
    this.writer.pixelRatio = this.scope.view.pixelRatio;
    console.log(this.scope.view);
    console.log(document.getElementById('maker').style);

    var newPath;

    this.scope.view.onMouseDown = (event) => {
      // If we produced a path before, deselect it:
      if (newPath) {
        newPath.selected = false;
      }

      // Create a new path and set its stroke color to black:
      newPath = new this.scope.Path({
        segments: [event.point],
        strokeColor: 'white',
        // Select the path, so we can see its segment points:
        fullySelected: true
      });
    }

    this.scope.view.onMouseDrag = (event) => {
      console.log(event.point);
      newPath.add(event.point);
    }

    this.scope.view.onMouseUp = () => {
      // When the mouse is released, simplify it:
      newPath.simplify(this.simplification);

      // Select the path, so we can see its segments:
      newPath.fullySelected = true;
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
  position: fixed;
  border: solid 2px white;
  background-color: rgba(0, 0, 0, 0.527);
}
._small{
  top: 50%; left: 10%;
  width: 80%; height: 20%;
}._narrow{
  top: 50%; left: 10%;
  width: 400px; height: 200px;
}._tablet{
  top: 50%; left: 10%;
  width: 80%; height: 20%;
}._wide{
  top: 50%; left: 10%;
  width: 80%; height: 20%;
}





</style>