<template>
<div id="background">
  {{VIEWTYPE}}
  <canvas id="BG"></canvas>
</div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
const paper = require('paper');

export default {
  name: "Background",
  data() { return {
    scope: null,
    COLORS: [],
    levels:{
      now: 0, 
      start: 42, 
      end: 38,
    },
    size: 0.66, amount: 6,
    velocity: 0.4
  }},
  computed: {
    ...mapState(['winSize']),
    ...mapGetters(['BBC', 'VIEWTYPE']),
    radius: function() {
      if(this.winSize.vw > this.winSize.vh){
        return {
          min: this.winSize.vh * this.size,
          max: this.winSize.vw * this.size
        }
      }else{
        return {
          min: this.winSize.vw * this.size,
          max: this.winSize.vh * this.size
        }
      }
    }
  },
  methods: {
    onResize() {
      this.scope.view.size.width = window.innerWidth;
      this.scope.view.size.height = window.innerHeight;
      this.scope.view.viewSize.width = window.innerWidth;
      this.scope.view.viewSize.height = window.innerHeight;
    },
  },
  created() {
    this.COLORS = this.BBC;
    this.scope = new paper.PaperScope();
  },
  mounted() {
    this.scope.setup(document.getElementById('BG'));
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })

    let circles = [];
    for(var i=0; i < this.amount; i++){
      let color = 'hsl('+ this.COLORS[i] + 'deg, 100%, 0%)'
      let colora = 'hsl('+ this.COLORS[i] + 'deg, 100%, 0%, 0)'
      var circle = new this.scope.Path.Circle({
        center: new this.scope.Point(
          Math.random() * (this.winSize.vw),
          Math.random() * (this.winSize.vh)
        ),
        radius: Math.random() * (this.radius.max - this.radius.min) + this.radius.min,
        data: {
          veloX: Math.random() * this.velocity,
          veloY: Math.random() * this.velocity,
          sizeVar: Math.random()
        }
      });
      circle.fillColor = {
        gradient: {
          stops: [color, colora],
          radial: true
        },
        origin: circle.position,
        destination: circle.bounds.rightCenter
      };
      circle.blendMode = 'saturation'
      circles[i] = circle;
    }

    function moveCircles(winSize, scope, circle, COLORS, bbc, i, levels){
      circle.position.x += circle.data.veloX
      circle.position.y += circle.data.veloY
      if((circle.position.x<0)||(circle.position.x>winSize.vw)){
        circle.data.veloX *= -1 ;
      }
      if((circle.position.y<0)||(circle.position.y>winSize.vh)){
        circle.data.veloY *= -1 ;
      }
      if(COLORS[i] !== bbc){
        if(bbc > COLORS[i]){
          COLORS[i] += 0.5;
        }else{
          COLORS[i] -= 0.5;
        }
        if(levels.now < levels.start){
          levels.now += 0.1;
          if(levels.now < levels.end + 0.1){
            circle.fillColor.gradient.stops = [
              'hsl('+COLORS[i]+'deg, 100%, '+levels.now+'%)', 
              'hsl('+COLORS[i]+'deg, 100%, '+levels.now+'%, 0)'
            ]
          }else{
            circle.fillColor.gradient.stops = [
              'hsl('+ COLORS[i] + 'deg, 100%, '+levels.now+'%)', 
              'hsl('+ COLORS[i] + 'deg, 100%, '+levels.end+'%, 0)'
            ]
          }
        }else{
          circle.fillColor.gradient.stops = [
          'hsl('+ COLORS[i] + 'deg, 100%, '+levels.start+'%)', 
          'hsl('+ COLORS[i] + 'deg, 100%, '+levels.end+'%, 0)'
          ]
        }
      }
    }

    this.scope.view.onFrame = () => {
      for(var i=0; i < this.amount; i++){
        moveCircles(this.winSize, this.scope, circles[i], this.COLORS, this.BBC[i], i, this.levels);
      }
    }
  },
}
</script>


<style lang="scss" scoped> 
#background {
  position: fixed; top: 0; left: 0; 
  padding: 0; margin: 0;
  width: 100vw; height: 100vh;
  // background-color: black;
  // background-color: fuchsia;
  color: transparent;
}
#BG {
  pointer-events: none;
  z-index: -10;
  position: absolute; top: 0; left: 0; 
  padding: 0; margin: 0;
  width: 100%; height: 100%
}
</style>