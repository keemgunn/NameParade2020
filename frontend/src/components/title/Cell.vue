<template>
<div id="cell-wrapper">




  <div class="back-circle">
    <svg 
    class="circle"
    stroke="#000000"
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        id="circle-closed"
        d="M25,50 C38.7588836,50 49.921346,37.5921381 50,25 C49.8815138,10.7809603 38.6242322,0 25,0 C11.1928813,0 0,11.1928813 0,25 C0,38.8071187 11.1928813,50 25,50 Z"
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1">
      </path>
    </svg>
  </div>

  <div class="index-marker">
    {{index}}
  </div>
</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations } from 'vuex';

const name ="Cell";
export default {
  name,
  components: { },
  props: [
    'block', 'index'
  ],
  data() { return {
    coord: []
  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


  },
  methods: {
    ...mapMutations([]),

    
  },
  created() {
    this.coord = [this.block[1],this.block[2]]
  },
  mounted() {
    const {TimeLine} = require('../../assets/javascripts/circleAnime');

    const t = TimeLine();
    t.add({
      targets: '.back-circle svg',
      keyframes: [
        {stroke: '#000000'},
        {stroke: '#ffffff'},
      ],
    })






    
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#cell-wrapper{
  position: relative;
  top: 10%; left: 10%;
  width: 80%; height: 80%;
  // color: dimgray;
  // background-color: skyblue;
}

.back-circle{
  position: absolute;
  width: 100%; height: 100%;
  // background-color: aqua;
}




















.index-marker{
  position: absolute;
  top: -6%; right: -6%;
  font-size: 13px;
  font-family: sans-serif;
}




</style>