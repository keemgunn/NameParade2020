<template>
<div id="cell-wrapper">


  <div class="back-circle">
    <svg 
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="circle"
        :id="circleId"
        d="M25,50 C38.7588836,50 49.921346,37.5921381 50,25 C49.8815138,10.7809603 38.6242322,0 25,0 C11.1928813,0 0,11.1928813 0,25 C0,38.8071187 11.1928813,50 25,50 Z"
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1">
      </path>
    </svg>
  </div>


  <div class="circle-typo">
    <svg 
    viewBox="0 0 52 52" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="none">
      <path 
        class="typo"
        :id="typoId"
        d=""
        fill-rule="evenodd"
        transform="translate(1.000000, 1.000000)"
        stroke-width="1.4">
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
import anime from 'animejs';
const {
  Timeline,
  keys,
  mountPosition,
  typoArr
} = require('../../assets/javascripts/circleAnime');


const name ="Cell";
export default {
  name,
  components: { },
  props: [
    'block', 'index', 'allMounted'
  ],
  data() { return {
    coord: [],
    CircleAnimation: null,
    TypoAnimation: null,
    typoIndex: -1,
    typoEl: null,

  }},
  computed: {
    ...mapState([
      'aniTiming'
    ]),
    ...mapGetters([
      'VIEWTYPE',
      'SEQ',
    ]),
    AT:function(){
      return this['aniTiming'][name]
    },
    circleId:function(){
      return 'circle'+this.index
    },
    typoId:function(){
      return 'typo'+this.typoIndex
    }
  },
  watch: {
    allMounted(nu, old){
      console.log(nu);
      this.CircleAnimation.play();
      return old
    }
  },
  methods: {
    ...mapMutations([]),
    playTypoAnimation(){
      if(this.typoIndex !== -1){
        console.log('triggered');
      }
      // this.TypoAnimation.play();
    }


  },
  created() {
    this.coord = [this.block[1],this.block[2]]
    this.typoIndex = mountPosition[this.SEQ][this.VIEWTYPE].indexOf(this.index);
  },
  mounted() {
    const delayOffset = this.index * 40;
    const backCircle = "#" + this.circleId;

    // ____________ INSERT TYPOGRAPHIES
    let typography = 0;
    if(this.typoIndex !== -1){
      typography = '#'+this.typoId;
      this.typoEl = document.querySelector(typography);
      this.typoEl.setAttribute("d", typoArr[this.typoIndex]);
    }

    

    // _________________________ BACKCIRCLE ANIMATION
    const CircleAnimation = Timeline(anime)
    .add({ targets: backCircle,
      stroke: [
        keys('#2C2A6A', delayOffset, 1000, 0, "easeOutExpo")
        ],
      strokeDashoffset: [
        {
          value: [anime.setDashoffset, 0], 
          delay: delayOffset,
          duration: 1000,
          endDelay: 0,
          direction: 'normal',
          easing: "easeOutQuad",
        }
      ]
    })
    .add({ targets: backCircle,
      stroke: [
        keys('#ffffff', 0, 300, 0, "easeOutExpo"),
        keys('#3C3B57', 0, 1000, 0, "easeOutExpo")
      ],
      complete: function() {
        trigger('TypoAnimation');
      }
    })



    // _________________________ TYPO ANIMATION
    const TypoAnimation = Timeline(anime)
    .add({ targets: typography,
      stroke: [
        keys('#ffffff', 0, 200, 0, "easeOutExpo")
        ],
      strokeDashoffset: [
        {
          value: [anime.setDashoffset, 0], 
          delay: function() { return anime.random(200, 1000); },
          duration: function() { return anime.random(3800, 5000); },
          endDelay: 0,
          direction: 'alternate',
          easing: "easeInOutQuart",
        }
      ],
      delay: 1000
    })






    const conditions = {
      TypoAnimation: (this.typoIndex !== -1),

    }
    function trigger(target){
      if(conditions[target]){
        play(target);
      }
    }

    function play(target){
      if(target === 'TypoAnimation'){
        TypoAnimation.play();
      }
    }

    // ________________________ TO USE IN COMPONENT SCOPE
    this.CircleAnimation = CircleAnimation;
    this.TypoAnimation = TypoAnimation;

    this.$emit('mounted', this.index);
  }
}
</script>



<style lang="scss" scoped> 
#cell-wrapper{
  position: relative;
  top: 6%; left: 6%;
  width: 88%; height: 88%;
  // color: dimgray;
  // background-color: skyblue;
}

.back-circle{
  position: absolute;
  width: 100%; height: 100%;
  // background-color: aqua;
}
.circle{
  stroke: #00000000;
}

.circle-typo{
  position: absolute;
  width: 100%; height: 100%;
  // background-color: aqua;
}
.typo{
  stroke :#00000000;
  stroke: red;
}












.index-marker{
  position: absolute;
  top: -6%; right: -6%;
  font-size: 13px;
  font-family: sans-serif;
}
</style>