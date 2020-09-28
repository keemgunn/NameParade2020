<template>
<div id="path-view">
  <svg 
  class="path-box"
  viewBox="0 0 710 710" version="1.1" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink"
  fill="none"
  stroke-width="7.5"
  stroke-linecap="round"
  strokeLinejoin="round">
  </svg>
</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';
const { Timeline, keys } = require('../../../assets/javascripts/circleAnime');
import anime from 'animejs';
import randomstring from 'randomstring';
const rand = randomstring.generate(6);

export default {
  name: "PathView",
  components: { },
  props: [
    'pathData'
  ],
  data() { return {
    userName: null,
    userTime: null,
    bounds: null,
    trans: null,
    paths: [],
    pathId: [],
    pathBox: null,
    childs: [],
    WritingAnimation: null,




  }},
  computed: {
    ...mapState([]),
    ...mapGetters([]),


  },
  methods: {
    ...mapMutations([]),
    startAnimation(pathId){
      this.WritingAnimation = Timeline(anime);
      for(var i=0; i < pathId.length; i++){
        this.addAnime(this.WritingAnimation, i);
      }
      this.WritingAnimation.add({ // __ CLOSING ANIMATION
        targets: '.path-box path',
        stroke: [
          keys('rgba(255, 255, 255, 0)', 1000, 2000, 0, "easeOutCubic"),
        ],
        strokeDashoffset: [
          {
            value: [0, anime.setDashoffset], 
            delay:  3000,
            duration: 10,
            endDelay: 0,
            direction: 'alternate',
            easing: "linear",
          }
        ],
      });
      this.WritingAnimation.finished.then(() => {
        this.removeAnime(pathId);
        this.WritingAnimation = null;
        for(var i=0; i < this.childs.length; i++){
          this.pathBox.removeChild(this.childs[i]);
        }
        this.$store.state.renderStatus += 1;
      })
      this.WritingAnimation.play();
      this.$store.state.renderStatus += 1;
    },
    addAnime(Ani, i){
      let id = '#' + rand + '-p-' + i;
      Ani.add({ targets: id,
        stroke: [
          keys('rgba(255, 255, 255, 1)', 1, 80, 0, "easeOutCubic"),
          keys('rgba(255, 255, 255, 0.733)', 81, 300, 0, "easeOutCubic")
        ],
        strokeDashoffset: [
          {
            value: [anime.setDashoffset, 0], 
            delay:  0,
            duration: function() { return anime.random(300, 500); },
            endDelay: 0,
            direction: 'alternate',
            easing: "linear",
          }
        ],
      })
    },
    removeAnime(pathId){
      for(var i=0; i<pathId.length; i++){
        anime.remove('#'+pathId[i])
      }
    }
  },
  created() {
    this.dataLength = this.pathData.length;
    for(var i=6; i<this.pathData.length; i++){
      this.paths.push(this.pathData[i]);
      this.pathId.push(rand+'-p-'+(i-6));
    }
    this.bounds = "0 0 " + this.pathData[2] + ' ' + this.pathData[3];
    this.trans = "translate( -" + (this.pathData[4]) + ", -" + this.pathData[5] + ")";
    this.userName = this.pathData[0];
    this.userTime = new Date(this.pathData[1]);
  },
  mounted() {
    this.pathBox = document.querySelector('.path-box');
    this.pathBox.setAttribute("viewBox", this.bounds);
    for(var i=0; i<this.pathId.length; i++){
      let pathNode = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      pathNode.setAttribute("id", this.pathId[i]);
      pathNode.setAttribute("d", this.paths[i]);
      pathNode.setAttribute("transform", this.trans);
      // pathNode.style.stroke = ""
      this.childs.push(pathNode);
      this.pathBox.appendChild( pathNode );
    }
    setTimeout(this.startAnimation, 200, this.pathId);
  },
  beforeDestroy() {
    this.WritingAnimation = null;
  },
}
</script>



<style lang="scss" scoped> 
#path-view{
  position: absolute; top: 7%; left: 0;
  width: 100%; height: 68%;
  // background-color: rgba(194, 102, 102, 0.336);
}
.path-box{
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  // stroke: rgba(255, 255, 255, 0);
}
</style>