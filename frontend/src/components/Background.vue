<template>
<div id="background">
  <br><br><br><br><br><br><br><br><br><br><br>
  ctx: {{ctx}} <br>

  <canvas> 

  </canvas>
</div>
</template>



<script>
import { mapGetters } from 'vuex'
const $canvas = document.querySelector('canvas');

export default {
  name: "Background",
  components: { },
  props: [

  ],
  data() { return {
    ctx: null,
    
    particles: [],

  }},
  computed: {
    ...mapGetters(['BBC'])
  },
  methods: {

  },
  created() {

  },
  mounted() {
    this.ctx = $canvas.getContext('2d')
    window.requestAnimationFrame($canvas.animate.bind($canvas));


  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#background {
  position: fixed; top: 0; left: 0; 
  padding: 0; margin: 0;
  width: 100vw; height: 100vh;
  overflow: hidden;
}
canvas {
  position: fixed; top: 0; left: 0; 
  padding: 0; margin: 0;
  width: 100%; height: 100%;
}




</style>