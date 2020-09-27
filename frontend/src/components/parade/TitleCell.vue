<template>
<div id="title-cell-wrapper">
  <div class="circle-typo">
    <svg 
    :id="reacter"
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
  <div class="index-marker" v-if="0">
    {{index}}
  </div>
</div>
</template>



<script>
import{ mapState, mapGetters, mapMutations} from 'vuex';
const { mountPosition, typoArr, Timeline } = require('../../assets/javascripts/circleAnime');
import anime from 'animejs';


export default {
  name: "TitleCell",
  components: { },
  props: [
    'index'
  ],
  data() { return {
    typoPositions: null,
    typoIndex: -1,
    typoEl: null,
    MountAnimation: null,

  }},
  computed: {
    ...mapState([

    ]),
    ...mapGetters([
      'VIEWTYPE',
      'PARADE_TITLE_MOUNTED',
      

    ]),


    typoId:function(){
      return 'typo'+this.typoIndex
    },
    reacter: function(){
      return 'react_'+this.index
    }
  },
  watch: {
    PARADE_TITLE_MOUNTED(nu, old){
      this.MountAnimation.play();
      return old
    }
  },
  methods: {
    ...mapMutations([]),

    
  },
  created() {
    this.typoPositions = mountPosition[2][this.VIEWTYPE];
    this.typoIndex = this.typoPositions.indexOf(this.index);
  },
  mounted() {
    // const delayOffset = this.index * 100;
    // ____________ INSERT TYPOGRAPHIES
    if(this.typoIndex !== -1){
      this.typoEl = document.querySelector('#'+this.typoId);
      this.typoEl.setAttribute("d", typoArr[this.typoIndex]);
    }

        // _________________________ TYPO ANIMATION
    this.MountAnimation = Timeline(anime)
    .add({ targets: '#'+this.typoId,
      strokeDashoffset: [
        {
          value: [anime.setDashoffset, 0], 
          delay: 1000 + function() { return anime.random(200, 1000); },
          duration: function() { return anime.random(3800, 5000); },
          endDelay: 0,
          direction: 'alternate',
          easing: "easeInOutQuart",
        }
      ],
      delay: 400
    })
    this.MountAnimation.finished.then(() => {

    });







    this.$emit('mounted', this.index);
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#title-cell-wrapper{
  position: relative;
  top: 6%; left: 6%;
  width: 88%; height: 88%;
}
.circle-typo{
  position: absolute;
  width: 100%; height: 100%;
}
.index-marker{
  position: absolute;
  top: -3%; right: -3%;
  font-size: 13px;
  font-family: sans-serif;
}
.typo{
  stroke :rgba(255, 255, 255, 0.76);
  // stroke :rgba(255, 255, 255, 0);
}
</style>